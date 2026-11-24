import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { DataTable } from "../../components/ui/DataTable";
import { Card, PageHeader } from "../../components/ui/Display";
import { DateFilter, FilterLabel, SearchBox, Tabs } from "../../components/ui/Filters";
import { ADMIN_DATE_FILTERS, ORDER_STATUS, STATUS_META } from "../../constants";
import { useData } from "../../context/data-context";
import { AssignOrderModal } from "../../features/orders/AssignOrderModal";
import { OrderDetailModal } from "../../features/orders/OrderDetailModal";
import { OrderFormModal } from "../../features/orders/OrderFormModal";
import { useOrderColumns } from "../../features/orders/useOrderColumns";
import { dateFilterLabel, dateHeading, matchesDateFilter } from "../../utils/date";
import { money, plural } from "../../utils/format";
import { sortOrders, totalValue } from "../../utils/orders";

const ALL = "All";

export default function Orders() {
  const { orders, getProduct } = useData();
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("today");
  const [statusFilter, setStatusFilter] = useState(ALL);
  const [modal, setModal] = useState(null); // { type: "create" | "detail" | "assign", orderId? }
  const closeModal = () => setModal(null);

  const columns = useOrderColumns({
    onView: (orderId) => setModal({ type: "detail", orderId }),
    onAssign: (orderId) => setModal({ type: "assign", orderId }),
  });

  // 1. date filter → 2. status tab → 3. search text
  const inDateRange = orders.filter((o) => matchesDateFilter(o.date, dateFilter));

  const statusTabs = [ALL, ...Object.values(ORDER_STATUS)].map((status) => ({
    value: status,
    label: status === ALL ? ALL : STATUS_META[status].label,
    count: status === ALL ? inDateRange.length : inDateRange.filter((o) => o.status === status).length,
  }));

  const query = search.trim().toLowerCase();
  const visible = sortOrders(
    inDateRange.filter(
      (o) =>
        (statusFilter === ALL || o.status === statusFilter) &&
        `${o.customer} ${o.id} ${getProduct(o.serviceId)?.service}`.toLowerCase().includes(query),
    ),
    true,
  );

  // After creating an order, jump to its date so it is visible.
  function showCreatedOrder(order) {
    setStatusFilter(ALL);
    setDateFilter(order.date);
  }

  return (
    <>
      <PageHeader
        title="Orders"
        subtitle="Offline orders (walk-in / phone) — assign to employees and track progress"
        action={<Button onClick={() => setModal({ type: "create" })}>+ Add order</Button>}
      />

      <SearchBox value={search} onChange={setSearch} placeholder="Search customer, order ID or service…" />

      <FilterLabel>Date</FilterLabel>
      <DateFilter options={ADMIN_DATE_FILTERS} value={dateFilter} onChange={setDateFilter} />

      <FilterLabel>Status</FilterLabel>
      <Tabs items={statusTabs} value={statusFilter} onChange={setStatusFilter} />

      <div className="result-line">
        Showing <b>{plural(visible.length, "order")}</b> for <b>{dateFilterLabel(dateFilter)}</b> · value{" "}
        {money(totalValue(visible, getProduct))}
      </div>

      <Card>
        <DataTable
          columns={columns}
          rows={visible}
          groupBy={(o) => o.date}
          groupLabel={dateHeading}
          emptyMessage="No orders for this date / status. Try another date."
        />
      </Card>

      {modal?.type === "create" && <OrderFormModal onClose={closeModal} onCreated={showCreatedOrder} />}
      {modal?.type === "assign" && <AssignOrderModal orderId={modal.orderId} onClose={closeModal} />}
      {modal?.type === "detail" && (
        <OrderDetailModal
          orderId={modal.orderId}
          onClose={closeModal}
          onAssign={() => setModal({ type: "assign", orderId: modal.orderId })}
        />
      )}
    </>
  );
}

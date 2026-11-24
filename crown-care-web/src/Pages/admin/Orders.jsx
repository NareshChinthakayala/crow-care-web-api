import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../../Components/ui/Button";
import { DataTable } from "../../Components/ui/DataTable";
import { Card, PageHeader } from "../../Components/ui/Display";
import { DateFilter, SearchBox } from "../../Components/ui/Filters";
import { ADMIN_DATE_FILTERS, ORDER_STATUS, STATUS_META } from "../../constants";
import { useData } from "../../context/data-context";
import { AssignOrderModal } from "../../features/orders/AssignOrderModal";
import { OrderDetailModal } from "../../features/orders/OrderDetailModal";
import { OrderFormModal } from "../../features/orders/OrderFormModal";
import { StatusFilter } from "../../features/orders/StatusFilter";
import { useOrderColumns } from "../../features/orders/useOrderColumns";
import { dateFilterLabel, dateHeading, matchesDateFilter } from "../../utils/date";
import { money, plural } from "../../utils/format";
import { sortOrders, totalValue } from "../../utils/orders";

const ALL = "All";

export default function Orders() {
  const { orders, getProduct } = useData();
  // Links like /admin/orders?status=New&date=all (from the dashboard) pre-select the filters
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState(searchParams.get("date") ?? "today");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") ?? ALL);
  const [modal, setModal] = useState(null); // { type: "create" | "detail" | "assign", orderId? }
  const closeModal = () => setModal(null);

  const columns = useOrderColumns({
    onView: (orderId) => setModal({ type: "detail", orderId }),
    onAssign: (orderId) => setModal({ type: "assign", orderId }),
  });

  // 1. date filter → 2. status tile → 3. search text
  const inDateRange = orders.filter((o) => matchesDateFilter(o.date, dateFilter));

  const statusTiles = [ALL, ...Object.values(ORDER_STATUS)].map((status) => ({
    value: status,
    label: status === ALL ? "All orders" : STATUS_META[status].label,
    tone: status === ALL ? "primary" : STATUS_META[status].tone,
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
        subtitle="Walk-in and phone orders — assign them to stylists and track progress."
        action={
          <Button icon="plus" onClick={() => setModal({ type: "create" })}>
            Add order
          </Button>
        }
      />

      {/* ---- Status board (also the status filter) ---- */}
      <StatusFilter items={statusTiles} value={statusFilter} onChange={setStatusFilter} />

      {/* ---- Results ---- */}
      <Card
        title={`Orders · ${dateFilterLabel(dateFilter)}`}
        subtitle={`${plural(visible.length, "order")} · ${money(totalValue(visible, getProduct))} total value`}
        action={<SearchBox value={search} onChange={setSearch} placeholder="Search orders…" />}
      >
        <div className="card-toolbar">
          <DateFilter options={ADMIN_DATE_FILTERS} value={dateFilter} onChange={setDateFilter} />
        </div>
        <DataTable
          columns={columns}
          rows={visible}
          rowClassName={(o) => `rail-${STATUS_META[o.status]?.tone ?? "gray"}`}
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

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { DataTable } from "../../components/ui/DataTable";
import {
  Avatar,
  Card,
  EmptyState,
  PageHeader,
  ProgressBar,
  StatCard,
  StatGrid,
} from "../../components/ui/Display";
import { ORDER_STATUS, ROUTES, STOCK_LOW } from "../../constants";
import { useData } from "../../context/data-context";
import { OrderFormModal } from "../../features/orders/OrderFormModal";
import { useOrderColumns } from "../../features/orders/useOrderColumns";
import { StockBadge } from "../../features/products/StockBadge";
import { longDate, TODAY } from "../../utils/date";
import { money } from "../../utils/format";
import { countCompleted, sortOrders, totalValue } from "../../utils/orders";

export default function Dashboard() {
  const { orders, employees, products, getProduct } = useData();
  const [showNewOrder, setShowNewOrder] = useState(false);
  const columns = useOrderColumns({ compact: true });

  const todaysOrders = sortOrders(orders.filter((o) => o.date === TODAY));
  const countStatus = (status) =>
    orders.filter((o) => o.status === status).length;
  const lowStock = products.filter((p) => p.stock <= STOCK_LOW);

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle={longDate(TODAY)}
        action={
          <Button onClick={() => setShowNewOrder(true)}>+ New order</Button>
        }
      />

      {/* <StatGrid> */}
      <StatCard
        label="Today's orders"
        value={todaysOrders.length}
        hint={`${orders.length} total in system`}
      />
      <StatCard
        label="Unassigned"
        value={countStatus(ORDER_STATUS.NEW)}
        tone="red"
        hint="Need an employee"
      />
      <StatCard
        label="In progress"
        value={countStatus(ORDER_STATUS.IN_PROGRESS)}
        tone="amber"
        hint={`${countCompleted(todaysOrders)} completed today`}
      />
      <StatCard
        label="Today's bookings value"
        value={money(totalValue(todaysOrders, getProduct))}
        hint="Sum of service prices"
      />
      {/* </StatGrid> */}

      <div className="grid-2">
        <Card
          title="Today's orders"
          action={
            <Link to={ROUTES.orders} className="small">
              Viewsss all →
            </Link>
          }
        >
          <DataTable
            columns={columns}
            rows={todaysOrders}
            emptyMessage="No orders today."
          />
        </Card>

        {/* <div className="stack">
          <Card title="Employee progress today">
            {employees.map((e) => {
              const mine = todaysOrders.filter((o) => o.employeeId === e.id);
              const done = countCompleted(mine);
              const percent = mine.length ? Math.round((done / mine.length) * 100) : 0;
              return (
                <div key={e.id} className="list-item">
                  <Avatar name={e.name} />
                  <div className="grow">
                    <div className="strong">{e.name}</div>
                    <div className="small muted">
                      {done}/{mine.length} done today · {e.status}
                    </div>
                    <div className="mt-6">
                      <ProgressBar value={percent} />
                    </div>
                  </div>
                </div>
              );
            })}
          </Card>

          <Card title="Low stock products" action={<Link to={ROUTES.products} className="small">Manage →</Link>}>
            {lowStock.length ? (
              lowStock.map((p) => (
                <div key={p.id} className="alert-item">
                  <div>
                    <div className="strong">{p.product}</div>
                    <div className="small muted">{p.service}</div>
                  </div>
                  <StockBadge stock={p.stock} suffix="left" />
                </div>
              ))
            ) : (
              <EmptyState>All products are well stocked.</EmptyState>
            )}
          </Card>
        </div> */}
      </div>

      {showNewOrder && (
        <OrderFormModal onClose={() => setShowNewOrder(false)} />
      )}
    </>
  );
}

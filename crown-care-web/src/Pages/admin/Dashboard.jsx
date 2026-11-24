import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, StatCard, StatGrid } from "../../Components/ui/Display";
import { Icon } from "../../Components/ui/Icon";
import { ORDER_STATUS, ROUTES } from "../../constants";
import { useAuth } from "../../context/auth-context";
import { useData } from "../../context/data-context";
import { OrderPipeline } from "../../features/dashboard/OrderPipeline";
import { TodaySchedule } from "../../features/dashboard/TodaySchedule";
import { WelcomeBanner } from "../../features/dashboard/WelcomeBanner";
import { AssignOrderModal } from "../../features/orders/AssignOrderModal";
import { OrderDetailModal } from "../../features/orders/OrderDetailModal";
import { OrderFormModal } from "../../features/orders/OrderFormModal";
import { TODAY } from "../../utils/date";
import { money, plural } from "../../utils/format";
import { countCompleted, dailySeries, sortOrders, totalValue } from "../../utils/orders";

const TREND_DAYS = 7; // how many days the mini trend lines show

/** Small "View all →" link used in card headers. */
const CardLink = ({ to, children }) => (
  <Link to={to} className="card-link">
    {children} <Icon name="arrowRight" />
  </Link>
);

export default function Dashboard() {
  const { user } = useAuth();
  const { orders, getProduct } = useData();
  const [modal, setModal] = useState(null); // { type: "create" | "detail" | "assign", orderId? }
  const closeModal = () => setModal(null);

  // ---- Numbers for the page ----
  const todaysOrders = sortOrders(orders.filter((o) => o.date === TODAY));
  const countStatus = (list, status) => list.filter((o) => o.status === status).length;
  const unassignedCount = countStatus(orders, ORDER_STATUS.NEW);
  const inProgressCount = countStatus(orders, ORDER_STATUS.IN_PROGRESS);

  // ---- 7-day trend lines (one number per day) ----
  const trend = (valueOf) => dailySeries(orders, TREND_DAYS, valueOf, TODAY);
  const ordersTrend = trend((day) => day.length);
  const completedTrend = trend((day) => countCompleted(day));
  const valueTrend = trend((day) => totalValue(day, getProduct));

  return (
    <>
      <WelcomeBanner
        name={user.name}
        unassignedCount={unassignedCount}
        inProgressCount={inProgressCount}
        onNewOrder={() => setModal({ type: "create" })}
      />

      {/* ---- Top numbers ---- */}
      <StatGrid>
        <StatCard
          icon="clipboard"
          label="Today's orders"
          value={todaysOrders.length}
          hint={`${orders.length} in total`}
          trend={ordersTrend}
        />
        <StatCard
          icon="alert"
          tone="red"
          label="Unassigned"
          value={unassignedCount}
          hint={unassignedCount ? "Waiting for a stylist" : "All assigned"}
        />
        <StatCard
          icon="check"
          tone="green"
          label="Completed today"
          value={countCompleted(todaysOrders)}
          hint={`${inProgressCount} in progress`}
          trend={completedTrend}
        />
        <StatCard
          icon="dollar"
          tone="amber"
          label="Today's bookings"
          value={money(totalValue(todaysOrders, getProduct))}
          hint="Sum of service prices"
          trend={valueTrend}
        />
      </StatGrid>

      <div className="grid-2">
        {/* ---- Left: today's appointments as a timeline ---- */}
        <Card
          title="Today's schedule"
          subtitle={plural(todaysOrders.length, "appointment")}
          action={<CardLink to={ROUTES.orders}>All orders</CardLink>}
        >
          <TodaySchedule
            orders={todaysOrders}
            onView={(orderId) => setModal({ type: "detail", orderId })}
            onAssign={(orderId) => setModal({ type: "assign", orderId })}
          />
        </Card>

        {/* ---- Right: where today's orders stand ---- */}
        <Card className="sticky-card" title="Order pipeline" subtitle="Today · tap a status to see those orders">
          <OrderPipeline orders={todaysOrders} />
        </Card>

        {/*
          HIDDEN FOR NOW: "Employee progress" and "Low stock" cards.
          To show them again: uncomment the block below, add `employees, products` to useData(),
          and import Avatar, EmptyState, ProgressBar (Display), StockBadge, STOCK_LOW.

        <div className="stack">
          <Card title="Employee progress" subtitle="Today">
            {employees.map((e) => {
              const mine = todaysOrders.filter((o) => o.employeeId === e.id);
              const done = countCompleted(mine);
              const percent = mine.length ? Math.round((done / mine.length) * 100) : 0;
              return (
                <div key={e.id} className="list-item">
                  <Avatar name={e.name} />
                  <div className="grow">
                    <div className="row-between">
                      <span className="strong">{e.name}</span>
                      <span className="small muted">{done}/{mine.length} done</span>
                    </div>
                    <div className="mt-6"><ProgressBar value={percent} /></div>
                  </div>
                </div>
              );
            })}
          </Card>

          <Card title="Low stock" action={<CardLink to={ROUTES.products}>Manage</CardLink>}>
            {products.filter((p) => p.stock <= STOCK_LOW).map((p) => (
              <div key={p.id} className="alert-item">
                <div className="grow">
                  <div className="strong">{p.product}</div>
                  <div className="small muted">{p.service}</div>
                </div>
                <StockBadge stock={p.stock} suffix="left" />
              </div>
            ))}
          </Card>
        </div>
        */}
      </div>

      {modal?.type === "create" && <OrderFormModal onClose={closeModal} />}
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

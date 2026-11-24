import { useState } from "react";
import { EmptyState, PageHeader, StatCard, StatGrid } from "../../Components/ui/Display";
import { DateFilter, FilterLabel } from "../../Components/ui/Filters";
import { EMPLOYEE_DATE_FILTERS } from "../../constants";
import { useAuth } from "../../context/auth-context";
import { useData } from "../../context/data-context";
import { AppointmentCard } from "../../features/appointments/AppointmentCard";
import { dateFilterLabel, dateHeading, isPastFilter, longDate, matchesDateFilter, TODAY } from "../../utils/date";
import { plural } from "../../utils/format";
import { countCompleted, groupByDate, isCompleted, sortOrders } from "../../utils/orders";

export default function MyAppointments() {
  const { user } = useAuth();
  const { orders } = useData();
  const [dateFilter, setDateFilter] = useState("today");

  const mine = orders.filter((o) => o.employeeId === user.id);
  const today = mine.filter((o) => o.date === TODAY);
  const visible = sortOrders(
    mine.filter((o) => matchesDateFilter(o.date, dateFilter)),
    isPastFilter(dateFilter),
  );
  const groups = groupByDate(visible);
  const label = dateFilterLabel(dateFilter);

  return (
    <>
      <PageHeader title={`Hi, ${user.name.split(" ")[0]} 👋`} subtitle={`${longDate(TODAY)} · Your assigned appointments`} />

      <StatGrid>
        <StatCard label="Today" value={today.length} hint={`${countCompleted(today)} done`} />
        <StatCard
          label="Pending"
          value={mine.filter((o) => o.date >= TODAY && !isCompleted(o)).length}
          tone="amber"
          hint="today + upcoming"
        />
        <StatCard label="Upcoming" value={mine.filter((o) => o.date > TODAY).length} hint="from tomorrow" />
        <StatCard
          label="Previous days"
          value={mine.filter((o) => o.date < TODAY).length}
          tone="green"
          hint="completed history"
        />
      </StatGrid>

      <FilterLabel>Show appointments</FilterLabel>
      <DateFilter options={EMPLOYEE_DATE_FILTERS} value={dateFilter} onChange={setDateFilter} />
      <div className="result-line">
        <b>{plural(visible.length, "appointment")}</b> for <b>{label}</b>
      </div>

      {visible.length === 0 ? (
        <div className="card">
          <EmptyState>
            No appointments for {label}.
            <br />
            <span className="small">Try &quot;Previous days&quot; or &quot;Upcoming&quot;.</span>
          </EmptyState>
        </div>
      ) : (
        Object.entries(groups).map(([date, dayOrders]) => (
          <section key={date}>
            <div className="date-head">
              <span>{dateHeading(date)}</span>
              <span>
                {countCompleted(dayOrders)}/{dayOrders.length} done
              </span>
            </div>
            <div className="appt-grid">
              {dayOrders.map((o) => (
                <AppointmentCard key={o.id} order={o} />
              ))}
            </div>
          </section>
        ))
      )}
    </>
  );
}

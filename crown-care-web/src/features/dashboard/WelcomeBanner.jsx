import { Button } from "../../Components/ui/Button";
import { HairWaves, WigArt } from "../../Components/ui/WigLoader";
import { ORDER_STATUS, ROUTES } from "../../constants";
import { longDate, TODAY } from "../../utils/date";
import { plural } from "../../utils/format";

/** "Good morning" / "Good afternoon" / "Good evening" based on the clock. */
function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

/**
 * Dark banner at the top of the dashboard.
 * Tells the owner what needs attention today and gives one-click actions.
 */
export function WelcomeBanner({ name, unassignedCount, inProgressCount, onNewOrder }) {
  // One short sentence about what needs attention
  let summary = "Everything is assigned — your stylists are all set.";
  if (unassignedCount > 0) {
    summary = `${plural(unassignedCount, "order")} still need a stylist, and ${inProgressCount} in progress right now.`;
  }

  return (
    <section className="banner">
      <HairWaves />

      <div className="banner-body">
        <div className="banner-eyebrow">{longDate(TODAY)}</div>
        <h1 className="banner-title">
          {greeting()}, {name.split(" ")[0]}
        </h1>
        <p className="banner-text">{summary}</p>

        <div className="banner-actions">
          <Button variant="light" icon="plus" onClick={onNewOrder}>
            New order
          </Button>
          {unassignedCount > 0 && (
            <Button variant="ghost-light" icon="userPlus" to={`${ROUTES.orders}?status=${ORDER_STATUS.NEW}&date=all`}>
              Assign {plural(unassignedCount, "order")}
            </Button>
          )}
        </div>
      </div>

      <div className="banner-art">
        <WigArt size={132} />
      </div>
    </section>
  );
}

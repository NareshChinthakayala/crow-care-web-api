# CrownCare – Salon Management (React)

React version of the CrownCare prototype: an admin panel (orders, products, employees)
and a stylist panel (my appointments). Runs on **dummy data** until the backend is ready.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

**Demo logins**
- Admin: `admin@crowncare.com` / `admin123`
- Stylist: `amara@crowncare.com` (or `E101`) / `amara123`. The login screen lists all demo accounts.

## Folder structure

```
src/
  api/            ← ONLY place that talks to the "server" (mock today, real API later)
  data/           ← dummy data used by the mock API
  constants/      ← routes, order statuses, filter chips, stock limits
  context/        ← app-wide state: auth session, salon data, toast messages
  hooks/          ← useAsyncAction (loading + error state for any async call)
  utils/          ← pure helpers: dates, money/time formatting, order lists
  components/
    ui/           ← generic building blocks (Button, Field, Modal, DataTable, Tabs, Badge…)
    layout/       ← page frames (AuthLayout, AdminLayout, EmployeeLayout, RequireAuth)
  features/       ← pieces tied to one domain (order modals, product form, appointment card…)
  pages/          ← one file per route; they compose features + ui components
  styles/global.css
```

### How data flows

```
page/component ──► useData() / useAuth() ──► src/api/*.js ──► mockDb (today) / http() (later)
```

- Pages never import dummy data directly. They read from `useData()` and call its actions
  (`createOrder`, `assignOrder`, `saveProduct`, …).
- Each action calls the API, then updates local state with the record the API returned.

## Connecting the real backend

1. Add `.env` with `VITE_API_URL=https://your-api.example.com`.
2. In each `src/api/*Api.js` file, replace the mock body with an `http()` call.
   Each function has a comment naming its endpoint:
   ```js
   // before
   list: () => mockResponse(mockDb.data.orders),
   // after
   list: () => http("/orders"),
   ```
3. In `src/utils/date.js` switch `TODAY` to the real date (see comment there).
4. When nothing imports them anymore, delete `api/mockDb.js`, `data/mockData.js`, `demoApi`,
   and the "Demo accounts" box in `pages/auth/EmployeeLogin.jsx`.

Screens, forms and components don't need changes, as long as the API returns the same field names.

## Common tasks

| I want to…                         | Edit                                                     |
| ---------------------------------- | -------------------------------------------------------- |
| Change brand colour                | `--primary` in `src/styles/global.css`                   |
| Add an admin page                  | new file in `pages/admin/`, route in `App.jsx`, link in `NAV_ITEMS` (`AdminLayout.jsx`) |
| Add an order status / rename label | `ORDER_STATUS` + `STATUS_META` in `constants/index.js`   |
| Change low-stock threshold         | `STOCK_LOW` / `STOCK_CRITICAL` in `constants/index.js`   |
| Build a new form in a modal        | `<FormModal onSubmit={async (values) => …}>` + `<Field>` |
| Show a list as a table             | `<DataTable columns={[…]} rows={…} />`                   |

## Deploying to Netlify

`public/_redirects` sends all paths to `index.html` so routes like `/admin/orders` work on refresh.
Build command `npm run build`, publish directory `dist`.

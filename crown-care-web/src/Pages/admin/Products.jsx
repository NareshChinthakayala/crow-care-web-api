import { useState } from "react";
import { Button } from "../../Components/ui/Button";
import { DataTable } from "../../Components/ui/DataTable";
import { Card, PageHeader, StatCard, StatGrid } from "../../Components/ui/Display";
import { SearchBox } from "../../Components/ui/Filters";
import { STOCK_CRITICAL, STOCK_LOW } from "../../constants";
import { useData } from "../../context/data-context";
import { ProductFormModal } from "../../features/products/ProductFormModal";
import { StockMeter } from "../../features/products/StockBadge";
import { money, plural } from "../../utils/format";

export default function Products() {
  const { products } = useData();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null); // null = closed, "new" = add form, product = edit form

  // ---- Search ----
  const query = search.trim().toLowerCase();
  const visible = products.filter((p) => `${p.service} ${p.product}`.toLowerCase().includes(query));

  // ---- Numbers for the stat cards ----
  const lowStockCount = products.filter((p) => p.stock <= STOCK_LOW).length;
  const criticalCount = products.filter((p) => p.stock <= STOCK_CRITICAL).length;
  const stockValue = products.reduce((sum, p) => sum + p.productPrice * p.stock, 0);

  // ---- Table columns ----
  const columns = [
    {
      key: "service",
      header: "Service",
      main: true,
      render: (p) => (
        <>
          <div className="cell-title nowrap">{p.service}</div>
          <div className="cell-sub only-m">{p.product}</div>
        </>
      ),
    },
    { key: "product", header: "Recommended product", hideOnMobile: true },
    { key: "duration", header: "Duration", nowrap: true },
    { key: "servicePrice", header: "Service price", align: "right", render: (p) => money(p.servicePrice) },
    { key: "productPrice", header: "Product price", align: "right", render: (p) => money(p.productPrice) },
    { key: "stock", header: "Stock", render: (p) => <StockMeter stock={p.stock} /> },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (p) => (
        <Button variant="outline" size="sm" icon="edit" onClick={() => setEditing(p)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Services & Products"
        subtitle="Wig services, the products you recommend with them, prices and stock."
        action={
          <Button icon="plus" onClick={() => setEditing("new")}>
            Add product
          </Button>
        }
      />

      <StatGrid>
        <StatCard icon="box" label="Total products" value={products.length} hint="Services with a product" />
        <StatCard icon="alert" tone="amber" label="Low stock" value={lowStockCount} hint={`${STOCK_LOW} or fewer left`} />
        <StatCard icon="alert" tone="red" label="Critical" value={criticalCount} hint={`${STOCK_CRITICAL} or fewer left`} />
        <StatCard icon="dollar" tone="green" label="Stock value" value={money(stockValue)} hint="Product price × stock" />
      </StatGrid>

      <Card
        title="All products"
        subtitle={query ? `${plural(visible.length, "result")} for "${search.trim()}"` : plural(products.length, "product")}
        action={<SearchBox value={search} onChange={setSearch} placeholder="Search service or product…" />}
      >
        <DataTable columns={columns} rows={visible} emptyMessage="No products match your search." />
      </Card>

      {editing && <ProductFormModal product={editing === "new" ? null : editing} onClose={() => setEditing(null)} />}
    </>
  );
}

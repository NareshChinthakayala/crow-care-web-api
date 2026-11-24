import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { DataTable } from "../../components/ui/DataTable";
import { Card, PageHeader } from "../../components/ui/Display";
import { SearchBox } from "../../components/ui/Filters";
import { useData } from "../../context/data-context";
import { ProductFormModal } from "../../features/products/ProductFormModal";
import { StockBadge } from "../../features/products/StockBadge";
import { money } from "../../utils/format";

export default function Products() {
  const { products } = useData();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null); // null = closed, "new" = add form, product = edit form

  const query = search.trim().toLowerCase();
  const visible = products.filter((p) => `${p.service} ${p.product}`.toLowerCase().includes(query));

  const columns = [
    { key: "no", header: "No.", hideOnMobile: true, render: (_p, i) => i + 1 },
    {
      key: "service",
      header: "Hair style / Service",
      label: "Service",
      main: true,
      render: (p) => (
        <>
          <div className="cell-title">{p.service}</div>
          <div className="cell-sub only-m">{p.product}</div>
        </>
      ),
    },
    { key: "product", header: "Product name", hideOnMobile: true },
    { key: "duration", header: "Duration" },
    { key: "servicePrice", header: "Service price", render: (p) => money(p.servicePrice) },
    { key: "productPrice", header: "Product price", render: (p) => money(p.productPrice) },
    { key: "stock", header: "Stock", render: (p) => <StockBadge stock={p.stock} /> },
    {
      key: "actions",
      header: "",
      label: "Action",
      render: (p) => (
        <Button variant="outline" size="sm" onClick={() => setEditing(p)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="African Hairstyles – Recommended Products"
        subtitle={`${products.length} services with recommended products`}
        action={<Button onClick={() => setEditing("new")}>+ Add product</Button>}
      />
      <SearchBox value={search} onChange={setSearch} placeholder="Search service or product…" />
      <Card>
        <DataTable columns={columns} rows={visible} emptyMessage="No products match your search." />
      </Card>

      {editing && (
        <ProductFormModal product={editing === "new" ? null : editing} onClose={() => setEditing(null)} />
      )}
    </>
  );
}

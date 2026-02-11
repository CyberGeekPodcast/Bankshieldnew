import { ProductsPage } from "./ProductsPage";

// Backward-compatible wrapper (App.tsx expects ProductPage)
export function ProductPage() {
  return <ProductsPage />;
}

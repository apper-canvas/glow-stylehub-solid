import { Routes, Route } from "react-router-dom";
import Layout from "@/components/organisms/Layout";
import Home from "@/components/pages/Home";
import Products from "@/components/pages/Products";
import ProductDetail from "@/components/pages/ProductDetail";
import Cart from "@/components/pages/Cart";
import Checkout from "@/components/pages/Checkout";
import Wishlist from "@/components/pages/Wishlist";

function AppRouter() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Layout>
  );
}

export default AppRouter;
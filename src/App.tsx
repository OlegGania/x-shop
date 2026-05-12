import "./App.scss";
import "./styles/reset.scss";
import "./assets/fonts/fonts.css";
import { Route, Routes } from "react-router-dom";
import Header from "./pages/LandingPage/Header/Header";
import ScrollToTop from "./shared/ui/ScrollToTop/ScrollToTop";
import Landing from "./pages/Landing";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import CartPage from "./pages/CartPage/CartPage";
import ProductCatalogPage from "./pages/ProductsCatalogPage/ProductsCatalogPage";
import FooterSection from "./shared/ui/FooterSection/FooterSection";
import { Bounce, ToastContainer } from "react-toastify";
import LoginPage from "./pages/Auth/LoginPage/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage/RegisterPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccesPage/OrderSuccessPage";
import ProtectedRoute from "./shared/routes/ProtectedRoute";
import ScrollToHash from "./shared/routes/ScrollToHash";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Header />
      <main>
        <ScrollToTop />
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/productsCatalog" element={<ProductCatalogPage />} />
          <Route path="/productsCatalog/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </main>
      <FooterSection />

      <Analytics />
    </>
  );
}

export default App;

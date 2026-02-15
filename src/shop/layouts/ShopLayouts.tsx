import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "@/components/layouts/Footer";
import NavBar from "@/components/NavBar";
import JsonLd from "@/components/seo/JsonLd";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};

const ShopLayouts = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-[#44d62c] selection:text-black flex flex-col">
      <JsonLd />

      <ScrollToTop />
      <NavBar />

      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default ShopLayouts;

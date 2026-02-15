import { createBrowserRouter, Navigate, useLocation } from "react-router";
import React, { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "./context/AuthContext";

const LoadingNode = ({
  message = "Sincronizando_Nodo...",
}: {
  message?: string;
}) => (
  <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono italic">
    <title>Cargando_Sistema... | Wismar.Dev</title>
    <Loader2 className="animate-spin text-[#44d62c] mb-4" size={40} />
    <div className="text-[#44d62c] text-[10px] tracking-[0.5em] animate-pulse uppercase">
      {message}
    </div>
  </div>
);

const ShopLayouts = lazy(() => import("./shop/layouts/ShopLayouts"));
const AdminLoyaouts = lazy(() => import("./admin/loyaouts/AdminLoyaouts"));
const AuthLayouts = lazy(() => import("./auth/layouts/AuthLayouts"));

const HomePage = lazy(() => import("./shop/pages/home/HomePage"));
const ProfilePage = lazy(() => import("./shop/pages/profile/ProfilePage"));
const ServicesPage = lazy(() => import("./shop/pages/services/ServicesPage"));
const ServicesMarketplace = lazy(
  () => import("./shop/pages/services/ServicesMarketplace"),
);
const ContactPage = lazy(() => import("./shop/pages/contact/ContactPage"));
const ProjectsPage = lazy(() => import("./shop/pages/project/ProjectsPage"));

const LoginPage = lazy(() => import("./auth/pages/login/LoginPage"));
const RegisterPage = lazy(() => import("./auth/pages/register/RegisterPage"));

const DasboardPage = lazy(() => import("./admin/pages/dashboard/DasboardPage"));
const AdminProjectsPage = lazy(
  () => import("./admin/pages/projects/AdminProjectsPage"),
);
const AdminSettingsPage = lazy(
  () => import("./admin/pages/settings/AdminSettingsPAge"),
);

const ErrorFallback = () => (
  <div className="min-h-screen bg-black flex flex-col items-center justify-center p-10 font-mono italic">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ff000005_0%,transparent_70%)] opacity-50" />
    <h2 className="text-red-500 text-2xl font-black mb-4 uppercase tracking-tighter z-10">
      Error_de_Sincronización_Nodo
    </h2>
    <p className="text-neutral-500 text-[10px] mb-8 uppercase tracking-widest text-center max-w-md z-10 leading-relaxed">
      Se ha detectado una colisión en el flujo de datos. Reiniciando
      protocolos...
    </p>
    <Button
      onClick={() => window.location.reload()}
      className="bg-[#44d62c] text-black font-black uppercase rounded-full px-10 h-14 z-10 hover:bg-white transition-all"
    >
      Reiniciar_Sistema
    </Button>
  </div>
);

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  if (loading) return <LoadingNode message="Verificando_Protocolo..." />;
  if (!currentUser)
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();
  if (loading) return <LoadingNode message="Sincronizando_Acceso_Root..." />;
  const isAdmin = currentUser?.email === "wiscol15@gmail.com";
  if (!currentUser || !isAdmin) return <Navigate to="/marketplace" replace />;
  return <>{children}</>;
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingNode />}>
        <ShopLayouts />
      </Suspense>
    ),
    errorElement: <ErrorFallback />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "perfil",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      { path: "services", element: <ServicesPage /> },
      {
        path: "marketplace",
        element: (
          <PrivateRoute>
            <ServicesMarketplace />
          </PrivateRoute>
        ),
      },
      { path: "contact", element: <ContactPage /> },

      { path: "projects", element: <ProjectsPage /> },
    ],
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<LoadingNode />}>
        <AuthLayouts />
      </Suspense>
    ),
    errorElement: <ErrorFallback />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "", element: <Navigate to="login" replace /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<LoadingNode />}>
        <AdminRoute>
          <AdminLoyaouts />
        </AdminRoute>
      </Suspense>
    ),
    errorElement: <ErrorFallback />,
    children: [
      { path: "", element: <DasboardPage /> },
      { path: "dashboard", element: <DasboardPage /> },
      { path: "projects", element: <AdminProjectsPage /> },
      { path: "settings", element: <AdminSettingsPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

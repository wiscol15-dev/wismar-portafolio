import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { appRouter } from "./app.router";

const WismarShoppApp = () => {
  return (
    <HelmetProvider>
      <RouterProvider router={appRouter} />
    </HelmetProvider>
  );
};

export default WismarShoppApp;

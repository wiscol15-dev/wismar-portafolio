import { Outlet, useNavigate } from "react-router";

const AuthLayouts = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
      onClick={handleBack}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#44d62c]/10 blur-[120px] rounded-full" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#44d62c15_1px,transparent_1px),linear-gradient(to_bottom,#44d62c15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="absolute inset-0 opacity-20 animate-[pulse_8s_ease-in-out_infinite] bg-neutral-900/50" />
      </div>

      <div
        className="relative z-10 w-full max-w-md mx-4 transition-all duration-500 ease-out animate-in zoom-in-95 fade-in slide-in-from-bottom-8"
        onClick={(e) => e.stopPropagation()}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayouts;

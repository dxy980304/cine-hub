import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import SideBar from "@/components/layouts/SideBar";

export const Route = createFileRoute("/_home")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-screen h-screen overflow-hidden flex">
      <SideBar />
      <Outlet />
      <Toaster richColors />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import Play from "@/views/Play";
export const Route = createFileRoute("/_home/play/$id")({
  component: Play,
});

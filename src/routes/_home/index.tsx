import { createFileRoute } from "@tanstack/react-router";
import VideoList from "@/views/VideoList";
export const Route = createFileRoute("/_home/")({
  component: VideoList,
});

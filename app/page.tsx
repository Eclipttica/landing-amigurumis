import { existsSync } from "node:fs";
import path from "node:path";
import { Landing } from "@/components/landing";
import { testimonials } from "@/lib/course";

const candidates = [
  "/videos/atelier-web.mp4",
  ...testimonials.map((testimonial) => testimonial.src),
];

export default function Home() {
  const availableVideos = candidates.filter((video) =>
    existsSync(path.join(process.cwd(), "public", video)),
  );
  return <Landing availableVideos={availableVideos} />;
}

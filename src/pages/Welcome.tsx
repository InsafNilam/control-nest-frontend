import { BackgroundBeams } from "../components/ui/background-beams";
import { Hero } from "../components/hero";
import { ScrollArea } from "../components/ui/scroll-area";

export default function Welcome() {
  return (
    <main className="flex min-h-screen min-w-full flex-col items-center justify-between bg-neutral-950">
      <ScrollArea className="h-full w-full relative z-10 px-4 py-8 scroll-smooth">
        <Hero />
      </ScrollArea>
      <BackgroundBeams />
    </main>
  );
}

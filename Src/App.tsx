import { useState } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { ThumbGallery } from "./components/ThumbGallery";
import { Process } from "./components/Process";
import { Press } from "./components/Press";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Marquee } from "./components/Marquee";
import { SweatyShopOpening } from "./components/SweatyShopOpening";
import { ScrollProgress } from "./components/ScrollProgress";
import { FloatingContact } from "./components/FloatingContact";

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-ink-900)] text-[var(--color-ink-50)] antialiased">
      <ScrollProgress />
      {!opened && <SweatyShopOpening onComplete={() => setOpened(true)} />}
      <Nav />
      <main>
        <Hero />
        <Marquee variant="thin" />
        <ThumbGallery />
        <Marquee variant="thin" />
        <Process />
        <Press />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}

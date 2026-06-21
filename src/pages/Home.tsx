import { useEffect, useState } from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import Listings from "@/components/sections/Listings";
import Gallery from "@/components/sections/Gallery";
import Brokers from "@/components/sections/Brokers";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Loader from "@/components/Loader";

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaderDone(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {!loaderDone && <Loader />}
      {/* Offset for fixed navbar */}
      <div className="pt-[68px]">
        <Navbar />
        <main>
          <Hero />
          <Ticker />
          <Listings />
          <Gallery />
          <Brokers />
          <Process />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

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
import SEO from "@/components/SEO";

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    if (hasSeenLoader) {
      setLoaderDone(true);
    } else {
      const t = setTimeout(() => {
        setLoaderDone(true);
        sessionStorage.setItem("hasSeenLoader", "true");
      }, 2200);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <>
      <SEO
        title="BRUT Realty — Mumbai's Premier Real Estate Agency"
        description="Premium properties in Mumbai's finest neighbourhoods. Worli, Bandra, Juhu, Malabar Hill and beyond. No fluff, just results."
        path="/"
      />
      {!loaderDone && <Loader />}
      {/* Offset for fixed navbar */}
      <div className="pt-20">
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

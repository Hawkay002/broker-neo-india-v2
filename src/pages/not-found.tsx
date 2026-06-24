import { Link } from "wouter";
import Navbar from "@/components/sections/Navbar";
import SEO from "@/components/SEO";

export default function NotFound() {
  return (
    <div className="pt-20">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Let's get you back to finding your perfect property."
        path="/404"
      />
      <Navbar />
      <div className="min-h-[80vh] bg-background flex flex-col items-center justify-center px-5 text-center">
        <p className="font-mono font-bold text-primary text-sm tracking-[0.3em] uppercase mb-4">404</p>
        <h1 className="font-sans font-extrabold leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(40px, 8vw, 88px)" }}>
          Page Not <span className="stroke">Found.</span>
        </h1>
        <p className="font-sans text-muted-foreground text-base md:text-lg mb-8 max-w-md">
          The page you're looking for doesn't exist. Let's get you back to finding your perfect property.
        </p>
        <Link
          to="/"
          className="btn-fill-dark bg-primary text-primary-foreground px-7 py-4 font-bold border-2 border-foreground bs bs-hover uppercase tracking-widest text-sm cursor-pointer inline-block"
        >
          Back to Home →
        </Link>
      </div>
    </div>
  );
}

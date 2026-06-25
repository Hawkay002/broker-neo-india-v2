import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { ClickEffect } from "@/components/ClickEffect";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AboutPage from "@/pages/AboutPage";
import OurStoryPage from "@/pages/OurStoryPage";
import CareersPage from "@/pages/CareersPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import AccessibilityPage from "@/pages/AccessibilityPage";
import AllListingsPage from "@/pages/AllListingsPage";
import ListingDetailPage from "@/pages/ListingDetailPage";
import FeaturedListingPage from "@/pages/FeaturedListingPage";
import ServicePage from "@/pages/ServicePage";
import NeighbourhoodPage from "@/pages/NeighbourhoodPage";
import TeamPage from "@/pages/TeamPage";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location]);
  return null;
}

function Router() {
  const [location] = useLocation();
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Switch>
          {/* Home */}
          <Route path="/" component={(props) => <PageTransition><Home {...props} /></PageTransition>} />
  
          {/* Company */}
          <Route path="/about" component={(props) => <PageTransition><AboutPage {...props} /></PageTransition>} />
          <Route path="/our-story" component={(props) => <PageTransition><OurStoryPage {...props} /></PageTransition>} />
          <Route path="/careers" component={(props) => <PageTransition><CareersPage {...props} /></PageTransition>} />
          <Route path="/team" component={(props) => <PageTransition><TeamPage {...props} /></PageTransition>} />
  
          {/* Listings */}
          <Route path="/listings" component={(props) => <PageTransition><AllListingsPage {...props} /></PageTransition>} />
          <Route path="/listings/:slug" component={(props) => <PageTransition><ListingDetailPage {...props} /></PageTransition>} />
          <Route path="/featured/:slug" component={(props) => <PageTransition><FeaturedListingPage {...props} /></PageTransition>} />
          {/* Services */}
          <Route path="/services/:slug" component={(props) => <PageTransition><ServicePage {...props} /></PageTransition>} />
  
          {/* Neighbourhoods */}
          <Route path="/neighbourhoods/:slug" component={(props) => <PageTransition><NeighbourhoodPage {...props} /></PageTransition>} />
  
          {/* Legal */}
          <Route path="/privacy" component={(props) => <PageTransition><PrivacyPage {...props} /></PageTransition>} />
          <Route path="/terms" component={(props) => <PageTransition><TermsPage {...props} /></PageTransition>} />
          <Route path="/accessibility" component={(props) => <PageTransition><AccessibilityPage {...props} /></PageTransition>} />
  
          <Route component={(props) => <PageTransition><NotFound {...props} /></PageTransition>} />
        </Switch>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <CustomCursor />
        <ScrollToTopButton />
        <ClickEffect />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

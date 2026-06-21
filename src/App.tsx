import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
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
  return (
    <>
      <ScrollToTop />
      <Switch>
        {/* Home */}
        <Route path="/" component={Home} />

        {/* Company */}
        <Route path="/about" component={AboutPage} />
        <Route path="/our-story" component={OurStoryPage} />
        <Route path="/careers" component={CareersPage} />
        <Route path="/team" component={TeamPage} />

        {/* Listings */}
        <Route path="/listings" component={AllListingsPage} />
        <Route path="/listings/:slug" component={ListingDetailPage} />

        {/* Services */}
        <Route path="/services/:slug" component={ServicePage} />

        {/* Neighbourhoods */}
        <Route path="/neighbourhoods/:slug" component={NeighbourhoodPage} />

        {/* Legal */}
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/accessibility" component={AccessibilityPage} />

        <Route component={NotFound} />
      </Switch>
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
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

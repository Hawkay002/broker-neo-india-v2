import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation } from "wouter";
import { listings, type Listing, FILTERS } from "@/data";

interface ListingFilters {
  search: string;
  neighborhood: string;
  type: "All" | "Rent" | "Sale" | "Off-Market";
  minPrice: number;
  maxPrice: number;
  minBeds: number;
  maxBeds: number;
  sortBy: "price-asc" | "price-desc" | "newest" | "largest";
}

const DEFAULT_FILTERS: ListingFilters = {
  search: "",
  neighborhood: "All",
  type: "All",
  minPrice: 0,
  maxPrice: 0,
  minBeds: 0,
  maxBeds: 0,
  sortBy: "newest",
};

function parsePrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[₹,]/g, "")) || 0;
}

function getUrlParams(): Partial<ListingFilters> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get("search") || "",
    neighborhood: params.get("neighborhood") || "All",
    type: (params.get("type") as ListingFilters["type"]) || "All",
    minPrice: parseInt(params.get("minPrice") || "0") || 0,
    maxPrice: parseInt(params.get("maxPrice") || "0") || 0,
    minBeds: parseInt(params.get("minBeds") || "0") || 0,
    maxBeds: parseInt(params.get("maxBeds") || "0") || 0,
    sortBy: (params.get("sortBy") as ListingFilters["sortBy"]) || "newest",
  };
}

function setUrlParams(filters: Partial<ListingFilters>) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== DEFAULT_FILTERS[key as keyof ListingFilters]) {
      params.set(key, String(value));
    }
  });
  const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
  window.history.replaceState({}, "", newUrl);
}

export type { ListingFilters };

export function useListings() {
  const [location] = useLocation();
  const [filters, setFilters] = useState<ListingFilters>(() => ({
    ...DEFAULT_FILTERS,
    ...getUrlParams(),
  }));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const urlParams = getUrlParams();
    setFilters((prev) => ({ ...prev, ...urlParams }));
  }, [location]);

  const updateFilters = useCallback((newFilters: Partial<ListingFilters>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      setUrlParams(updated);
      return updated;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setUrlParams({});
  }, []);

  const filteredListings = useMemo(() => {
    return listings
      .filter((listing) => {
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          const matchesName = listing.name.toLowerCase().includes(searchLower);
          const matchesNeighborhood = listing.neighborhood.toLowerCase().includes(searchLower);
          const matchesTagline = listing.tagline.toLowerCase().includes(searchLower);
          if (!matchesName && !matchesNeighborhood && !matchesTagline) return false;
        }

        if (filters.neighborhood !== "All" && listing.neighborhood !== filters.neighborhood) {
          return false;
        }

        if (filters.type !== "All" && listing.type !== filters.type) {
          return false;
        }

        const price = parsePrice(listing.price);
        if (filters.minPrice && price < filters.minPrice) return false;
        if (filters.maxPrice && price > filters.maxPrice) return false;

        if (filters.minBeds && listing.beds < filters.minBeds) return false;
        if (filters.maxBeds && listing.beds > filters.maxBeds) return false;

        return true;
      })
      .sort((a, b) => {
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);
        switch (filters.sortBy) {
          case "price-asc":
            return priceA - priceB;
          case "price-desc":
            return priceB - priceA;
          case "largest":
            return parseInt(b.sqft.replace(/,/g, "")) - parseInt(a.sqft.replace(/,/g, ""));
          case "newest":
          default:
            return b.id - a.id;
        }
      });
  }, [filters]);

  const hasActiveFilters = useMemo(() => {
    return Object.entries(filters).some(
      ([key, value]) => value !== DEFAULT_FILTERS[key as keyof ListingFilters]
    );
  }, [filters]);

  const priceRange = useMemo(() => {
    const prices = listings.map((l) => parsePrice(l.price));
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, []);

  const bedRange = useMemo(() => {
    const beds = listings.map((l) => l.beds);
    return { min: Math.min(...beds), max: Math.max(...beds) };
  }, []);

  return {
    listings: filteredListings,
    allListings: listings,
    filters,
    updateFilters,
    clearFilters,
    hasActiveFilters,
    isLoading,
    setIsLoading,
    priceRange,
    bedRange,
    FILTERS,
    totalCount: listings.length,
    filteredCount: filteredListings.length,
  };
}
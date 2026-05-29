"use client";

import { useEffect } from "react";

export function ScrollToTopOnLoad() {
  useEffect(() => {
    if (window.location.hash) return;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
}

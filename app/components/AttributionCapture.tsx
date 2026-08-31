"use client";

import { useEffect } from "react";
import { initializeLeadAttribution } from "./LeadAttribution";

export default function AttributionCapture() {
  useEffect(() => {
    initializeLeadAttribution();
  }, []);

  return null;
}

/** Shared functional icons: 24-unit grid, rounded 1.75 stroke, currentColor. */
export type ServiceIconName = "HEAT" | "ATTIC" | "FULL" | "COOL" | "RTU" | "CHECK" | "CHAT" | "CLOSE";
export default function ServiceIcon({ name }: { name: ServiceIconName }) {
  const paths: Record<ServiceIconName, React.ReactNode> = {
    CHAT: <><path d="M20 11a8 8 0 0 1-8 8H4l1-4a8 8 0 1 1 15-4Z"/><path d="M8 9h8M8 13h5"/></>,
    CLOSE: <path d="m6 6 12 12M18 6 6 18"/>,
    HEAT: <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 17h6M12 7c0 2-3 3-3 5a3 3 0 0 0 6 0c0-1-1-2-1-2s0 2-2 2c1-2 0-5 0-5Z"/></>,
    ATTIC: <><path d="m3 11 9-8 9 8M5 10v11h14V10M8 16h8M12 12v8"/></>,
    FULL: <><rect x="2" y="4" width="8" height="16" rx="1"/><path d="M4 8h4M4 16h4"/><rect x="13" y="9" width="9" height="11" rx="1"/><circle cx="17.5" cy="14.5" r="2.5"/></>,
    COOL: <><path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 3 3-3M9 20l3-3 3 3M3 10l4-1-1-4M18 19l-1-4 4-1M3 14l4 1-1 4M18 5l-1 4 4 1"/></>,
    RTU: <><rect x="3" y="7" width="18" height="12" rx="1"/><path d="M6 7V4h12v3M15 10h3M15 13h3M15 16h3M2 21h20"/><circle cx="8.5" cy="13" r="3"/></>,
    CHECK: <path d="m5 12 4 4L19 6"/>,
  };
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name]}</svg>;
}

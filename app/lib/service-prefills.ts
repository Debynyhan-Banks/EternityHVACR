// Public service names only; never put customer data into handoff URLs.
export const servicePrefills = {
  "furnace-heating-repair": { requestType: "Repair or diagnostic", service: "Heating" },
  "boiler-service": { requestType: "Repair or diagnostic", service: "Boiler" },
  "commercial-refrigeration": { requestType: "Commercial / refrigeration", service: "Refrigeration" },
} as const;

export function servicePrefill(scope: string | null) {
  return scope && Object.hasOwn(servicePrefills, scope)
    ? servicePrefills[scope as keyof typeof servicePrefills] : undefined;
}

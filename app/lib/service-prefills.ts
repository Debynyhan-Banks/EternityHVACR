// Public service names only; never put customer data into handoff URLs.
export const servicePrefills = {
  "commercial-service": { requestType: "Commercial / refrigeration", service: "Commercial HVAC", customer: "A business" },
  "installation-estimate": { requestType: "Installation estimate", service: "Installation", timing: "Planning an estimate" },
  "furnace-heating-repair": { requestType: "Repair or diagnostic", service: "Heating" },
  "boiler-service": { requestType: "Repair or diagnostic", service: "Boiler" },
  "commercial-refrigeration": { requestType: "Commercial / refrigeration", service: "Refrigeration" },
} as const;

export function servicePrefill(scope: string | null) {
  return scope && Object.hasOwn(servicePrefills, scope)
    ? servicePrefills[scope as keyof typeof servicePrefills] : undefined;
}

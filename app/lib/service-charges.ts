// Website service terms. No payment is collected by this form.
export const serviceHours = "Regular hours: Monday–Friday, 7 a.m.–7 p.m.; Saturday, 9 a.m.–5 p.m., Eastern Time. Sunday: emergencies only.";
export const paidServiceTerms = "Residential: $99 during regular hours; $149 after hours ($99 + $50). Commercial: $150 during regular hours; $225 after hours ($150 + $75). Pay at the visit. These are service visit charges; repair work is quoted separately.";
export const freeEstimateTerms = "Free installation estimate, onsite or remote, for replacement or new equipment. Troubleshooting and repair visits are paid service calls.";
export function isPaidServiceRequest(requestType: string) {
  return requestType !== "Installation estimate";
}
export function requestChargeSummary(requestType: string) {
  return isPaidServiceRequest(requestType)
    ? `Service-charge acknowledgment: Confirmed on website. ${paidServiceTerms} ${serviceHours}`
    : freeEstimateTerms;
}

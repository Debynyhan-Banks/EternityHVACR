export type AnswerSource = {
  name: string;
  publisher: string;
  url: string;
};

export type AnswerSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type ExpertAnswer = {
  slug: string;
  category: string;
  question: string;
  description: string;
  image: string;
  directAnswer: string;
  localContext: string;
  sections: AnswerSection[];
  warningSigns: string[];
  safetyNote: string;
  faqs: Array<[string, string]>;
  sources: AnswerSource[];
  serviceHref: string;
  serviceLabel: string;
  proofHref?: string;
  proofLabel?: string;
  published: string;
  updated: string;
};

export const expertAnswers: ExpertAnswer[] = [
  {
    slug: "walk-in-cooler-icing-up",
    category: "Commercial refrigeration",
    question: "Why is my walk-in cooler icing up?",
    description: "Common causes of ice on a walk-in cooler evaporator, safe observations to make and when a Greater Cleveland refrigeration technician is needed.",
    image: "/images/walk-in-cold-storage.jpg",
    directAnswer: "A walk-in cooler usually ices up because moisture is entering the box, airflow across the evaporator is restricted, or the defrost, drain, control or refrigeration system is not operating correctly. The ice pattern and operating measurements—not the ice alone—are what identify the cause.",
    localContext: "Greater Cleveland’s humid summers and frequent door traffic can increase the moisture load on a walk-in. Ice that returns after it melts is a symptom that should be diagnosed, not simply removed.",
    sections: [
      {
        heading: "The most common causes",
        bullets: [
          "A door that is left open, does not close fully or has a damaged gasket, allowing warm humid air into the box.",
          "Blocked product, dirt or a fan problem reducing airflow through the evaporator coil.",
          "A defrost schedule, termination control, heater or drain problem that leaves frost on the coil.",
          "A drain obstruction or failed drain heater allowing water to refreeze around the evaporator.",
          "A refrigeration-feed or control condition that drives the evaporator temperature unusually low.",
        ],
      },
      {
        heading: "What you can observe safely",
        paragraphs: [
          "Record the box temperature, alarm history and when the ice first appeared. Note whether the ice is limited to one area or covers the full coil, whether the evaporator fans are running and whether the door closes and seals without a visible gap.",
          "Keep stored product clear of the evaporator air path and minimize unnecessary door openings while service is arranged. Those observations give the technician a better starting point without disturbing the equipment.",
        ],
      },
      {
        heading: "What a technician should verify",
        paragraphs: [
          "A refrigeration diagnosis may include the door and gasket, airflow, fan operation, coil condition, defrost sequence, drain, sensors and controls. Refrigerant-side measurements may also be needed when the operating pattern points beyond an air or defrost problem.",
        ],
      },
    ],
    warningSigns: [
      "The box temperature is rising or an alarm is active.",
      "Ice is blocking the evaporator or fans.",
      "Water is collecting near electrical equipment or creating a slip hazard.",
      "The ice returns soon after a normal defrost cycle.",
    ],
    safetyNote: "Do not chip ice with a knife or sharp tool, bypass a safety, force a control setting or open refrigerant or electrical components. Those actions can damage the coil or create an electrical, pressure or refrigerant hazard.",
    faqs: [
      ["Does ice always mean the walk-in is low on refrigerant?", "No. Door infiltration, airflow, fan, defrost, drain and control problems can all create ice. Refrigerant condition should be determined from system measurements, not appearance alone."],
      ["Can I remove the ice myself?", "Avoid sharp tools, heat guns and control changes. Keep the door closed, protect the product according to your food-safety plan and arrange professional service when ice is obstructing the coil or returning."],
      ["Why does the ice come back after defrost?", "Recurring ice indicates that the moisture source, airflow restriction, defrost fault or refrigeration condition is still present. The pattern should be diagnosed before another forced thaw is attempted."],
      ["Does Eternity service walk-in coolers in Greater Cleveland?", "Yes. Eternity Mechanical Services provides commercial refrigeration diagnostics, repair and maintenance for walk-ins and other cold-storage equipment across its approved Greater Cleveland service area."],
    ],
    sources: [
      { name: "Cold-room troubleshooting and fault diagnosis", publisher: "Danfoss", url: "https://www.danfoss.com/en-us/industries/food-and-beverage/dcs/cold-rooms/system-design-component-selection/application-vertical-market-sizing/troubleshooting-fault-diagnosis/" },
      { name: "The principles behind adaptive defrost", publisher: "Danfoss", url: "https://www.danfoss.com/en/about-danfoss/articles/dcs/the-secret-behind-danfoss-adaptive-defrost/" },
      { name: "Commercial refrigerators and freezers purchasing guidance", publisher: "U.S. Department of Energy", url: "https://www.energy.gov/cmei/femp/purchasing-energy-efficient-commercial-refrigerators-and-freezers" },
    ],
    serviceHref: "/services/commercial-refrigeration",
    serviceLabel: "Commercial refrigeration service",
    published: "2026-08-28",
    updated: "2026-08-28",
  },
  {
    slug: "rooftop-hvac-short-cycling",
    category: "Commercial HVAC",
    question: "What causes a rooftop HVAC unit to short-cycle?",
    description: "Why a commercial rooftop HVAC unit starts and stops too often, what a facility manager can document and how technicians diagnose the cause.",
    image: "/images/euclid/cleveland-commercial-rooftop-hvac-service-1200.webp",
    directAnswer: "A rooftop HVAC unit short-cycles when it starts and stops more often than its control sequence intends. Common causes include thermostat or control problems, restricted airflow, incorrect sizing or staging, electrical faults, refrigerant-system problems and a safety control shutting the unit down.",
    localContext: "On Greater Cleveland commercial properties, changing outdoor conditions, heating and cooling changeovers and roof exposure can make the pattern intermittent. A timestamped operating history is more useful than replacing parts based on a single symptom.",
    sections: [
      {
        heading: "Why short-cycling matters",
        paragraphs: [
          "Repeated starts can increase wear, reduce comfort and keep a cooling cycle from running long enough to control indoor humidity. Short-cycling is a symptom; the correct repair depends on why the control sequence is ending.",
        ],
      },
      {
        heading: "What a facility manager can document",
        bullets: [
          "The affected zone, thermostat setting and time each cycle starts and stops.",
          "Whether the blower stops with the heating or cooling stage, or continues to run.",
          "Any controller message, alarm or fault code that can be viewed without opening equipment.",
          "Recent filter, thermostat, control or building-schedule changes.",
          "Whether the symptom occurs during heating, cooling or both.",
        ],
      },
      {
        heading: "How the cause is diagnosed",
        paragraphs: [
          "A technician should compare the call for heating or cooling with the unit’s actual sequence. The evaluation can include thermostat and control signals, airflow and filters, temperature change, fan operation, electrical condition, safeties and—when indicated—refrigerant-system measurements.",
          "The equipment’s model, control history and measured operating conditions help separate a building-control issue from an airflow, component or refrigeration fault.",
        ],
      },
    ],
    warningSigns: [
      "The unit repeatedly attempts to start but does not remain on.",
      "A breaker trips, an electrical odor is present or the unit makes an unusual sound.",
      "The occupied space is losing temperature control during extreme weather.",
      "A fault code or safety lockout returns after a reset.",
    ],
    safetyNote: "Do not climb onto a roof, open energized panels, bypass safeties or repeatedly reset a tripping breaker. Rooftop access, electrical testing and refrigerant diagnosis belong with a qualified service technician.",
    faqs: [
      ["How do I know whether the cycle is actually too short?", "Compare the operation with the manufacturer’s sequence and the building’s control schedule. A technician can use control history and measured run times to determine whether cycling is abnormal."],
      ["Can a dirty filter cause short-cycling?", "Restricted airflow can contribute to temperature or pressure safety trips, but the filter should not be assumed to be the only cause. The full airflow path and unit sequence need to be checked."],
      ["Can an oversized rooftop unit short-cycle?", "Yes. Oversizing or improper staging can satisfy a thermostat quickly, but controls, load, airflow and equipment condition should also be evaluated before that conclusion is made."],
      ["Does Eternity diagnose commercial rooftop units?", "Yes. Eternity provides commercial rooftop-unit diagnostics and service for offices, retail, restaurants, multifamily properties and other Greater Cleveland facilities."],
    ],
    sources: [
      { name: "What is a rooftop unit?", publisher: "Trane", url: "https://www.trane.com/commercial/north-america/us/en/about-us/newsroom/glossary/rooftop-unit.html" },
      { name: "Air conditioner short-cycling troubleshooting", publisher: "Trane", url: "https://www.trane.com/residential/en/resources/troubleshooting/air-conditioners/ac-short-cycling/" },
    ],
    serviceHref: "/services/commercial-hvac",
    serviceLabel: "Commercial HVAC service",
    proofHref: "/projects/euclid-rooftop-hvac-diagnostic",
    proofLabel: "Read a verified rooftop diagnostic case study",
    published: "2026-08-28",
    updated: "2026-08-28",
  },
  {
    slug: "furnace-repair-vs-replacement",
    category: "Heating",
    question: "When should a furnace be repaired versus replaced?",
    description: "A practical furnace repair-or-replace framework using safety, verified condition, repair history, cost, comfort and long-term plans—not age alone.",
    image: "/images/euclid/euclid-oh-sinclair-furnace-installation-1200.webp",
    directAnswer: "Repair a furnace when the defect is isolated, safe to correct and the rest of the system is in sound condition. Consider replacement when a confirmed safety problem, recurring major repairs, unavailable parts, poor overall condition or the combined cost and performance tradeoffs make another repair a weak long-term choice. Age is a factor, not a verdict.",
    localContext: "Greater Cleveland heating systems operate through long cold seasons, so the decision should account for reliability as well as the immediate repair. The furnace, venting, controls, ducts and cooling-system match all affect the final recommendation.",
    sections: [
      {
        heading: "Repair may be the better choice when",
        bullets: [
          "The failure is limited to a serviceable component and the underlying cause is understood.",
          "The heat exchanger, combustion, venting and electrical condition are acceptable after inspection.",
          "The system has not developed a pattern of recurring major repairs.",
          "Parts are available and the repair supports the homeowner’s expected time in the property.",
        ],
      },
      {
        heading: "Replacement deserves consideration when",
        bullets: [
          "An inspection confirms a safety concern that cannot be acceptably corrected.",
          "Major failures are recurring or multiple systems need substantial work.",
          "Critical parts are obsolete or the equipment’s overall condition is poor.",
          "Comfort, airflow or distribution problems require a broader system design review.",
          "A repair cost is high relative to an appropriately sized replacement and its expected service life.",
        ],
      },
      {
        heading: "Ask for a measured comparison",
        paragraphs: [
          "A useful proposal identifies the failed component, the evidence supporting the diagnosis and what is—and is not—included. For replacement, ask how the load, equipment size, efficiency, venting, electrical needs, duct condition and cooling-system compatibility were considered.",
          "Efficiency ratings can help compare equipment, but proper sizing, installation and duct performance also affect comfort and operating results.",
        ],
      },
    ],
    warningSigns: [
      "A carbon-monoxide alarm activates or a technician identifies a combustion or venting concern.",
      "The furnace will not remain operating during freezing conditions.",
      "A breaker trips, wiring overheats or an unusual electrical odor is present.",
      "The same major failure or lockout keeps returning.",
    ],
    safetyNote: "Do not bypass a limit, alter gas or venting components or continue operating equipment after a confirmed safety concern. Follow the alarm manufacturer’s and local emergency guidance when a carbon-monoxide alarm activates, then have the heating system evaluated.",
    faqs: [
      ["Does a 15-year-old furnace automatically need replacement?", "No. Age helps frame remaining-life and parts questions, but verified condition, safety, repair history, cost and building needs should drive the decision."],
      ["Is the repair price the only number that matters?", "No. Compare what caused the failure, the condition of the rest of the system, likely future work, equipment compatibility and how long you expect to keep the property."],
      ["Does a higher AFUE rating guarantee lower bills?", "No. AFUE is an equipment efficiency rating. Weather, fuel price, thermostat use, sizing, installation, ducts and the building envelope also affect energy use."],
      ["Can ductwork affect a furnace recommendation?", "Yes. Restrictive, leaky or poorly distributed ductwork can affect airflow and comfort. It should be considered before replacing equipment to solve a building-wide comfort problem."],
    ],
    sources: [
      { name: "Home heating and cooling upgrade guidance", publisher: "U.S. Department of Energy", url: "https://www.energy.gov/sites/default/files/2013/11/f5/hvac_guide.pdf" },
      { name: "Residential furnace purchasing guidance", publisher: "U.S. Department of Energy", url: "https://www.energy.gov/cmei/femp/purchasing-energy-efficient-residential-furnaces" },
      { name: "Energy Saver Guide", publisher: "U.S. Department of Energy", url: "https://www.energy.gov/sites/default/files/2022-08/energy-saver-guide-2022.pdf" },
    ],
    serviceHref: "/#schedule",
    serviceLabel: "Request heating service",
    proofHref: "/projects/euclid-central-air-installation",
    proofLabel: "See a documented Euclid furnace replacement",
    published: "2026-08-28",
    updated: "2026-08-28",
  },
  {
    slug: "commercial-refrigeration-maintenance-frequency",
    category: "Preventive maintenance",
    question: "How often should commercial refrigeration be maintained?",
    description: "How to set a commercial refrigeration maintenance schedule based on equipment, operating load, environment, door traffic and manufacturer requirements.",
    image: "/images/maintenance.jpg",
    directAnswer: "Commercial refrigeration should be inspected on a documented schedule tailored to the equipment and operation; there is no single interval that fits every cooler, freezer or condensing system. Manufacturer requirements, operating hours, door traffic, grease and dust exposure, outdoor conditions, temperature criticality and service history determine the right frequency.",
    localContext: "A Greater Cleveland restaurant kitchen, a low-traffic storage freezer and an outdoor condensing unit face different loads. A baseline inspection lets the maintenance frequency follow the equipment’s actual condition instead of an arbitrary calendar rule.",
    sections: [
      {
        heading: "Build the schedule around risk and workload",
        bullets: [
          "Follow the equipment manufacturer’s maintenance instructions and warranty requirements.",
          "Increase observation and cleaning frequency where grease, lint, dust or high door traffic accumulates quickly.",
          "Account for outdoor cottonwood, seasonal debris, snow and temperature extremes around condensing equipment.",
          "Use alarm history, temperature records and prior repairs to identify equipment that needs closer attention.",
          "Give critical product-storage equipment a response and contingency plan, not only a cleaning date.",
        ],
      },
      {
        heading: "What a maintenance visit should cover",
        paragraphs: [
          "The exact checklist depends on the system, but it commonly includes recorded temperatures and controls, door operation and gaskets, evaporator and condenser condition, airflow and fans, drains and defrost operation, electrical condition and evidence of refrigerant leakage. Findings should be documented so changes can be compared over time.",
        ],
      },
      {
        heading: "Operator checks between professional visits",
        paragraphs: [
          "Staff can record temperatures and alarms, keep doors and air paths clear, look for torn gaskets, and report new ice, water, noise or long run times. Coil cleaning, electrical work, refrigerant work and control changes should follow manufacturer instructions and qualified-service requirements.",
        ],
      },
    ],
    warningSigns: [
      "Temperature or alarm trends are changing from the normal operating pattern.",
      "Ice, water, oil residue or damaged door seals are visible.",
      "Fans sound different, run intermittently or airflow feels restricted.",
      "The system runs unusually long or the same fault keeps returning.",
    ],
    safetyNote: "Do not open energized panels, wash components without the manufacturer’s procedure, disturb refrigerant piping or adjust safety and defrost controls without training. Maintenance should protect food safety and equipment safety at the same time.",
    faqs: [
      ["Is annual commercial refrigeration service always enough?", "Not necessarily. High-load or contaminated environments can need more frequent inspection and cleaning. The manufacturer’s requirements and a baseline condition assessment should set the interval."],
      ["What can restaurant staff check every day?", "Staff can record temperatures and alarms, confirm doors close, keep air paths clear and report ice, water, unusual noise or changed run time. Equipment-specific procedures should remain in the site’s operating plan."],
      ["Does preventive maintenance prevent every breakdown?", "No. It cannot eliminate every failure, but documented inspection can identify developing airflow, door, drain, electrical, control and leak-related conditions before they become larger problems."],
      ["Can Eternity create a maintenance plan for multiple units?", "Eternity can evaluate the equipment mix, operating conditions and property needs, then recommend a documented scope and service frequency for approval."],
    ],
    sources: [
      { name: "Commercial refrigerators and freezers purchasing guidance", publisher: "U.S. Department of Energy", url: "https://www.energy.gov/cmei/femp/purchasing-energy-efficient-commercial-refrigerators-and-freezers" },
      { name: "GreenChill leak-prevention and repair guidance", publisher: "U.S. Environmental Protection Agency", url: "https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P100BBR3.TXT" },
      { name: "Energy guidance for grocery and food sales", publisher: "ENERGY STAR", url: "https://www.energystar.gov/buildings/resources-audience/small-biz/grocery" },
    ],
    serviceHref: "/services/preventive-maintenance",
    serviceLabel: "Preventive maintenance service",
    proofHref: "/services/commercial-refrigeration",
    proofLabel: "Explore commercial refrigeration capabilities",
    published: "2026-08-28",
    updated: "2026-08-28",
  },
];

export function getExpertAnswer(slug: string) {
  const answer = expertAnswers.find((item) => item.slug === slug);
  if (!answer) throw new Error(`Unknown expert answer: ${slug}`);
  return answer;
}

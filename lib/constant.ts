export const tags: Record<string, string[]> = {
  origin: [
    "China",
    "India",
    "Belgium",
    "Sweden",
    "Germany",
    "Malaysia",
    "Turkey",
    "Italy",
    "New Zealand",
    "Vietnam",
    "Worldwide",
    "Australia",
    "Thailand",
    "Netherland",
    "Japan",
    "Indonesia",
    "Philippines",
    "Europe",
    "Southeast Asia",
    "Singapore",
    "Spain",
  ],
  destination: [
    "Usa",
    "Vietnam",
    "Canada",
    "Belgium",
    "Philippines",
    "Malaysia",
    "Australia",
    "Brazil",
    "Trinidad & Tobago",
    "Japan",
    "Qatar",
    "Germany",
    "Laos",
    "Myanmar",
    "Cambodia",
    "Uae",
    "Middle East",
    "South Africa",
    "Angola",
    "Singapore",
    "Indonesia",
  ],
  commodity: [
    "Surge Bin",
    "Structural Steel",
    "Renewable Energy System",
    "Patrol Boats",
    "Amazon River Cruise Boat",
    "Liftboat",
    "Drydock",
    "Mobile",
    "Shiploader",
    "Steel Structures",
    "Transformer And Accessories",
    "Steel Pipe Column",
    "Floating Pontoons",
    "Steel Beams",
    "Heavy Equipment",
    "Equipment For Pipelines",
    "Dump Trays",
    "General Cargo",
    "Machinery And Equipment",
    "Man Engine",
    "Lifeboats",
    "Gas Turbine Generator",
    "Compressor Modules & E-Houses",
    "Saudi Arabia",
    "Pipe-Racks, Skids, Spools",
    "Substation Module",
    "Waste Heat Recovery Units",
    "Blades And Tower",
    "Vacuum Insulated Pipe Spools",
    "Substation",
    "Modules",
    "Raw Materials",
    "Components For Steel Mills",
  ],
  bussinessUnit: ["Project", "Logistic", "Warehousing", "Trading"],
};

export const aspectRatioFallback = (width: number, height: number): string => `@supports not (aspect-ratio: ${width} / ${height}) {
    &::before {
      float: left;
      padding-top: ${width * 100 / height}%;
      content: '';
    }

    &::after {
      display: block;
      content: '';
      clear: both;
    }
}`;
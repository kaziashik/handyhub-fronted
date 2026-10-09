export const serviceCatalog = [
  {
    title: "Air Conditioning Services",
    detail: "Cooling and AC unit visits from an approved technician.",
    specialization: "Air conditioning",
    image: "/images/ac.jpg",
  },
  {
    title: "Electrical Services",
    detail: "Wiring, lighting, and breaker visits from approved electricians.",
    specialization: "Electrical",
    image: "/images/electrical.jpg",
  },
  {
    title: "Plumbing Services",
    detail: "Leak, fixture, and pipe visits from approved plumbers.",
    specialization: "Plumbing",
    image: "/images/plumbing.jpg",
  },
  {
    title: "Handyman Services",
    detail: "Small home repairs when the technician lists handyman work.",
    specialization: "Handyman",
    image: "/images/handyman.jpg",
  },
  {
    title: "Home Cleaning",
    detail: "Home cleaning visits from an approved cleaner, with a published fee and time.",
    specialization: "Home cleaning",
    image: "/images/cleaning.jpg",
  },
  {
    title: "Painting",
    detail: "Interior painting visits with a published fee and time.",
    specialization: "Painting",
    image: "/images/painting.jpg",
  },
  {
    title: "Locksmith Services",
    detail: "Lock and key visits from an approved locksmith.",
    specialization: "Locksmith",
    image: "/images/locksmith.jpg",
  },
  {
    title: "Pest Control",
    detail: "Home pest treatment visits from an approved technician.",
    specialization: "Pest control",
    image: "/images/pest.jpg",
  },
  {
    title: "Water Heater Services",
    detail: "Water heater checks and repairs with a published fee.",
    specialization: "Water heater",
    image: "/images/heater.jpg",
  },
  {
    title: "Appliance Repair",
    detail: "Home appliance visits with a published fee and time.",
    specialization: "Appliance",
    image: "/images/appliance.jpg",
  },
  {
    title: "Gardening & Landscaping",
    detail: "Garden and yard visits from an approved technician.",
    specialization: "Gardening",
    image: "/images/garden.jpg",
  },
  {
    title: "Moving & Furniture",
    detail: "Moving and furniture help with a published fee and time.",
    specialization: "Moving",
    image: "/images/moving.jpg",
  },
] as const;

export function serviceHref(specialization: string) {
  return `/technicians?specialization=${encodeURIComponent(specialization)}`;
}

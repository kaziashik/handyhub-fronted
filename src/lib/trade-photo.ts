export function tradePhoto(specialization?: string | null) {
  const value = (specialization ?? "").toLowerCase();
  if (value.includes("air") || value.includes("cooling") || value.includes("condition")) {
    return "/images/ac.jpg";
  }
  if (value.includes("electric")) return "/images/electrical.jpg";
  if (value.includes("heater") || value.includes("boiler") || value.includes("geyser")) {
    return "/images/heater.jpg";
  }
  if (value.includes("plumb") || value.includes("pipe")) return "/images/plumbing.jpg";
  if (value.includes("appliance") || value.includes("laundry")) return "/images/appliance.jpg";
  if (value.includes("clean") || value.includes("housekeep") || value.includes("maid")) {
    return "/images/cleaning.jpg";
  }
  if (value.includes("paint")) return "/images/painting.jpg";
  if (value.includes("lock")) return "/images/locksmith.jpg";
  if (value.includes("pest") || value.includes("insect")) return "/images/pest.jpg";
  if (value.includes("garden") || value.includes("landscap")) return "/images/garden.jpg";
  if (value.includes("mov") || value.includes("furniture")) return "/images/moving.jpg";
  if (value.includes("handy")) return "/images/handyman.jpg";
  if (
    value.includes("neuro") ||
    value.includes("medic") ||
    value.includes("clinic") ||
    value.includes("health")
  ) {
    return "/images/care.jpg";
  }
  return "/images/general.jpg";
}

export function tradePhoto(specialization?: string | null) {
  const value = (specialization ?? "").toLowerCase();
  if (value.includes("electric")) return "/images/electrical.jpg";
  if (value.includes("plumb") || value.includes("pipe")) return "/images/plumbing.jpg";
  if (value.includes("appliance") || value.includes("laundry")) return "/images/appliance.jpg";
  if (value.includes("clean") || value.includes("housekeep") || value.includes("maid")) {
    return "/images/cleaning.jpg";
  }
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

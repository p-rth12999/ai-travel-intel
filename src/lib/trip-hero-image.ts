export function getTripHeroImage(tripId: string, width = 500, height = 300) {
  return `https://picsum.photos/seed/${tripId}/${width}/${height}`
}
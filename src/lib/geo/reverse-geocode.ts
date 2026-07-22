export async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    )
    const data = await res.json()
    return data.city || data.locality || data.principalSubdivision || null
  } catch {
    return null
  }
}
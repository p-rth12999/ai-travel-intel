export type DestinationMeta = {
  destination: string
  country: string | null
  countryCode: string | null
  lat: number | null
  lon: number | null
}

async function geocodePlace(query: string) {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
    )
    const data = await res.json()
    return data.results?.[0] ?? null
  } catch {
    return null
  }
}

export async function buildDestinationMeta(destinations: string[]): Promise<DestinationMeta[]> {
  return Promise.all(
    destinations.map(async (d) => {
      const geo = await geocodePlace(d)
      return {
        destination: d,
        country: geo?.country ?? null,
        countryCode: geo?.country_code ?? null,
        lat: geo?.latitude ?? null,
        lon: geo?.longitude ?? null,
      }
    })
  )
}
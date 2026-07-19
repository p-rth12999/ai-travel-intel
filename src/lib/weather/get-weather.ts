export interface WeatherSnapshot {
  location: string
  forecast: string
}

export async function getWeatherSnapshot(
  destination: string,
  startDate: string,
  endDate: string
): Promise<WeatherSnapshot | null> {
  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(destination)}&count=1`
    )
    const geoData = await geoRes.json()
    const place = geoData.results?.[0]
    if (!place) return null

    const { latitude, longitude, name, country } = place

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&start_date=${startDate}&end_date=${endDate}`
    )
    const weatherData = await weatherRes.json()
    if (!weatherData.daily) return null

    const days = weatherData.daily.time.map(
      (date: string, i: number) =>
        `${date}: ${weatherData.daily.temperature_2m_min[i]}–${weatherData.daily.temperature_2m_max[i]}°C, ${weatherData.daily.precipitation_probability_max[i]}% chance of rain`
    )

    return { location: `${name}, ${country}`, forecast: days.join('; ') }
  } catch {
    return null
  }
}
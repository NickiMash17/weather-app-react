import { fetchWeather } from './useWeather'

const useCurrentLocation = () => {
  const getCurrentLocation = (): Promise<{ city: string }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        async position => {
          try {
            const { latitude, longitude } = position.coords
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2344c92a7ff896b70d4ee84a698a321d`
            )
            const data = await response.json()
            resolve({ city: data.name })
          } catch (error) {
            reject(error)
          }
        },
        error => {
          reject(new Error('Unable to retrieve your location'))
        }
      )
    })
  }

  return { getCurrentLocation }
}

export default useCurrentLocation
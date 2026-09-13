import { useEffect, useState } from 'react'

const initialState = {
  coordinates: null,
  accuracy: null,
  status: 'locating',
  error: null,
}

export function useGeolocation() {
  const [location, setLocation] = useState(initialState)

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({ ...initialState, status: 'unsupported', error: 'Geolocation is not supported by this browser.' })
      return undefined
    }

    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        setLocation({
          coordinates: [coords.latitude, coords.longitude],
          accuracy: coords.accuracy,
          status: 'ready',
          error: null,
        })
      },
      (error) => {
        setLocation({ ...initialState, status: 'denied', error: error.message })
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 },
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return location
}

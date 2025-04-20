import { useEffect, useState } from 'react'
import { NonSensitiveDiaryEntry } from '@backend/types'
import axios from 'axios'
import FlightList from './components/FlightList'
import DiaryEntryForm from './components/DiaryForm'

const App = () => {
  const [flights, setFlights] = useState<NonSensitiveDiaryEntry[]>([])

  useEffect(() => {
    axios
      .get<NonSensitiveDiaryEntry[]>('/api/diaries')
      .then((response) => {
        setFlights(response.data)
      })
      .catch((error) => {
        console.error('Error fetching flight data:', error)
      })
  }, [])

  const addFlight = (newFlight: NonSensitiveDiaryEntry) => {
    setFlights((prevFlights) => [...prevFlights, newFlight])
  }

  return (
    <div>
      <h1>Flight Diary</h1>
      <DiaryEntryForm onSuccess={addFlight} />
      <FlightList flights={flights} />
    </div>
  )
}

export default App

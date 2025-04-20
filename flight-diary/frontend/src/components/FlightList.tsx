import { NonSensitiveDiaryEntry } from '@backend/types'

const FlightList = ({ flights }: { flights: NonSensitiveDiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            <strong>{flight.date}</strong>
            <br />
            <div style={{ marginBlockEnd: '1em' }}>
              <div>visibility: {flight.visibility}</div>
              <div>weather: {flight.weather}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FlightList

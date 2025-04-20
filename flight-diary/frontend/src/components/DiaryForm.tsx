import { NonSensitiveDiaryEntry } from '@backend/types'
import { useForm } from '@tanstack/react-form'
import axios from 'axios'
import { useState } from 'react'

const DiaryEntryForm = ({
  onSuccess
}: {
  onSuccess: (newFlight: NonSensitiveDiaryEntry) => void
}) => {
  const [backendError, setBackendError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      date: '',
      visibility: '',
      weather: '',
      comment: ''
    },
    onSubmit: async ({ value }) => {
      try {
        // Log the data being sent to help debug
        console.log('Submitting data:', value)

        const response = await axios.post('/api/diaries', value, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        // Clear error and handle success
        setBackendError(null)
        onSuccess(response.data)
        alert('Entry added successfully!')
        form.reset()
      } catch (error: unknown) {
        console.error('Error submitting form:', error)

        // More detailed error handling
        if (axios.isAxiosError(error)) {
          setBackendError(`Server error: ${error.response?.data}`)
        } else {
          setBackendError(`Error: unexpected error occurred`)
        }
      }
    }
  })

  return (
    <div>
      {backendError && (
        <div
          style={{
            color: 'red',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid red'
          }}
        >
          {backendError}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <form.Field name="date">
          {(field) => (
            <div>
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="visibility">
          {(field) => (
            <div>
              <label htmlFor="visibility">Visibility:</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label>
                  <input
                    type="radio"
                    name={field.name}
                    value="great"
                    checked={field.state.value === 'great'}
                    onChange={() => field.handleChange('great')}
                  />
                  Great
                </label>
                <label>
                  <input
                    type="radio"
                    name={field.name}
                    value="good"
                    checked={field.state.value === 'good'}
                    onChange={() => field.handleChange('good')}
                  />
                  Good
                </label>
                <label>
                  <input
                    type="radio"
                    name={field.name}
                    value="ok"
                    checked={field.state.value === 'ok'}
                    onChange={() => field.handleChange('ok')}
                  />
                  Ok
                </label>
                <label>
                  <input
                    type="radio"
                    name={field.name}
                    value="poor"
                    checked={field.state.value === 'poor'}
                    onChange={() => field.handleChange('poor')}
                  />
                  Poor
                </label>
              </div>
              {field.state.meta.errors.length ? (
                <em style={{ color: 'red' }}>
                  {field.state.meta.errors.join(', ')}
                </em>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field name="weather">
          {(field) => (
            <div>
              <label htmlFor="weather">Weather:</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label>
                  <input
                    type="radio"
                    name={field.name}
                    value="sunny"
                    checked={field.state.value === 'sunny'}
                    onChange={() => field.handleChange('sunny')}
                  />
                  Sunny
                </label>
                <label>
                  <input
                    type="radio"
                    name={field.name}
                    value="rainy"
                    checked={field.state.value === 'rainy'}
                    onChange={() => field.handleChange('rainy')}
                  />
                  Rainy
                </label>
                <label>
                  <input
                    type="radio"
                    name={field.name}
                    value="cloudy"
                    checked={field.state.value === 'cloudy'}
                    onChange={() => field.handleChange('cloudy')}
                  />
                  Cloudy
                </label>
                <label>
                  <input
                    type="radio"
                    name={field.name}
                    value="windy"
                    checked={field.state.value === 'windy'}
                    onChange={() => field.handleChange('windy')}
                  />
                  Windy
                </label>
              </div>
              {field.state.meta.errors.length ? (
                <em style={{ color: 'red' }}>
                  {field.state.meta.errors.join(', ')}
                </em>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field name="comment">
          {(field) => (
            <div>
              <label htmlFor="comment">Comment:</label>
              <input
                id="comment"
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors.length ? (
                <em style={{ color: 'red' }}>
                  {field.state.meta.errors.join(', ')}
                </em>
              ) : null}
            </div>
          )}
        </form.Field>

        <button type="submit" disabled={form.state.isSubmitting}>
          {form.state.isSubmitting ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  )
}

export default DiaryEntryForm

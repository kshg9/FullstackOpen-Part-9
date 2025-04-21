import { useState } from 'react';
import { Entry, HealthCheckRating, NewEntry } from '@backend/types';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Alert
} from '@mui/material';
import { useForm, AnyFieldApi } from '@tanstack/react-form';

interface Props {
  patientId: string;
  onSubmit: (entry: NewEntry) => Promise<void>;
  error?: string;
}

// Field info component for displaying errors
const FieldInfo = ({ field }: { field: AnyFieldApi }) => {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length > 0 ? (
        <Typography color="error" variant="caption">
          {field.state.meta.errors.join(', ')}
        </Typography>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
};

const AddNewEntryForm = ({ patientId, onSubmit, error }: Props) => {
  console.log(patientId);
  const [isOpen, setIsOpen] = useState(false);
  const [entryType, setEntryType] = useState<Entry['type']>('HealthCheck');

  const form = useForm({
    defaultValues: {
      description: '',
      date: '',
      specialist: '',
      diagnosisCodes: [] as string[],
      type: 'HealthCheck' as const,
      healthCheckRating: HealthCheckRating.Healthy,
      discharge: {
        date: '',
        criteria: ''
      },
      employerName: '',
      sickLeave: {
        startDate: '',
        endDate: ''
      }
    },
    onSubmit: async ({ value }) => {
      const baseEntry = {
        description: value.description,
        date: value.date,
        specialist: value.specialist,
        diagnosisCodes: value.diagnosisCodes.length > 0 ? value.diagnosisCodes : undefined
      };

      let entry: NewEntry;
      switch (entryType) {
        case 'HealthCheck':
          entry = {
            ...baseEntry,
            type: 'HealthCheck',
            healthCheckRating: value.healthCheckRating
          };
          break;
        case 'Hospital':
          entry = {
            ...baseEntry,
            type: 'Hospital',
            discharge: value.discharge
          };
          break;
        case 'OccupationalHealthcare':
          entry = {
            ...baseEntry,
            type: 'OccupationalHealthcare',
            employerName: value.employerName,
            sickLeave:
              value.sickLeave.startDate && value.sickLeave.endDate ? value.sickLeave : undefined
          };
          break;
        default:
          return assertNever(entryType);
      }

      try {
        await onSubmit(entry);
        setIsOpen(false);
      } catch (error) {
        console.error('Failed to submit:', error);
      }
    }
  });

  if (!isOpen) {
    return (
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Add New Entry
      </Button>
    );
  }

  return (
    <Box sx={{ p: 2, border: '1px dashed grey', mt: 3, mb: 3 }}>
      <Typography variant="h6">Add New Entry</Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <FormControl fullWidth margin="normal">
          <InputLabel sx={{ backgroundColor: 'white', padding: '0px 4px' }}>Entry Type</InputLabel>
          <Select value={entryType} onChange={(e) => setEntryType(e.target.value as Entry['type'])}>
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          </Select>
        </FormControl>

        <form.Field name="description">
          {(field) => (
            <Box mb={2}>
              <TextField
                fullWidth
                label="Description"
                required
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </Box>
          )}
        </form.Field>

        <form.Field name="date">
          {(field) => (
            <Box mb={2}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                required
                InputLabelProps={{ shrink: true }}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </Box>
          )}
        </form.Field>

        <form.Field name="specialist">
          {(field) => (
            <Box mb={2}>
              <TextField
                fullWidth
                label="Specialist"
                required
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </Box>
          )}
        </form.Field>

        <form.Field name="diagnosisCodes">
          {(field) => (
            <Box mb={2}>
              <TextField
                fullWidth
                label="Diagnosis Codes (comma separated)"
                value={field.state.value.join(', ')}
                onBlur={field.handleBlur}
                onChange={(e) =>
                  field.handleChange(e.target.value.split(',').map((code) => code.trim()))
                }
              />
              <FieldInfo field={field} />
            </Box>
          )}
        </form.Field>

        {entryType === 'HealthCheck' && (
          <form.Field name="healthCheckRating">
            {(field) => (
              <Box mb={2}>
                <FormControl fullWidth>
                  <InputLabel sx={{ backgroundColor: 'white', padding: '0px 4px' }}>
                    Health Check Rating
                  </InputLabel>
                  <Select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                  >
                    <MenuItem value={0}>Healthy (0)</MenuItem>
                    <MenuItem value={1}>Low Risk (1)</MenuItem>
                    <MenuItem value={2}>High Risk (2)</MenuItem>
                    <MenuItem value={3}>Critical Risk (3)</MenuItem>
                  </Select>
                </FormControl>
                <FieldInfo field={field} />
              </Box>
            )}
          </form.Field>
        )}

        {entryType === 'Hospital' && (
          <>
            <form.Field name="discharge.date">
              {(field) => (
                <Box mb={2}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Discharge Date"
                    InputLabelProps={{ shrink: true }}
                    required
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </Box>
              )}
            </form.Field>

            <form.Field name="discharge.criteria">
              {(field) => (
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Discharge Criteria"
                    required
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </Box>
              )}
            </form.Field>
          </>
        )}

        {entryType === 'OccupationalHealthcare' && (
          <>
            <form.Field name="employerName">
              {(field) => (
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Employer Name"
                    required
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </Box>
              )}
            </form.Field>

            <form.Field name="sickLeave.startDate">
              {(field) => (
                <Box mb={2}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Sick Leave Start Date"
                    InputLabelProps={{ shrink: true }}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </Box>
              )}
            </form.Field>

            <form.Field name="sickLeave.endDate">
              {(field) => (
                <Box mb={2}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Sick Leave End Date"
                    InputLabelProps={{ shrink: true }}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </Box>
              )}
            </form.Field>
          </>
        )}

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]: [boolean, boolean]) => (
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button type="submit" variant="contained" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Add Entry'}
              </Button>
              <Button variant="outlined" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </Box>
          )}
        </form.Subscribe>
      </form>
    </Box>
  );
};

const assertNever = (value: never): never => {
  throw new Error(`Unexpected value: ${value}`);
};

export default AddNewEntryForm;

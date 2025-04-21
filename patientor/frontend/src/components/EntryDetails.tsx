import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry
} from '@backend/types';
import { LocalHospital, Work, Healing } from '@mui/icons-material';
import { Card, CardContent, Typography, Box } from '@mui/material';
import DiagnosisCodeQuery from './DiagnosisCode';

const DisplayDiagnosisCodes = ({ codes }: { codes: string[] }) => {
  return (
    <Box mt={1}>
      {codes?.map((code) => (
        <DiagnosisCodeQuery key={code} code={code} />
      ))}
    </Box>
  );
};

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <LocalHospital color="error" />
          <Typography variant="h6">Hospital Visit</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Date: {entry.date}
        </Typography>
        <Typography>{entry.description}</Typography>
        <Typography variant="body2">
          Discharge: {entry.discharge.date} - {entry.discharge.criteria}
        </Typography>
        <Typography variant="body2">Specialist: {entry.specialist}</Typography>
        <DisplayDiagnosisCodes codes={entry.diagnosisCodes || []} />
      </CardContent>
    </Card>
  );
};

const OccupationalHealthcareEntryDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Work color="primary" />
          <Typography variant="h6">Occupational Healthcare</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Employer: {entry.employerName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date: {entry.date}
        </Typography>
        <Typography>{entry.description}</Typography>
        {entry.sickLeave && (
          <Typography variant="body2">
            Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
          </Typography>
        )}
        <Typography variant="body2">Specialist: {entry.specialist}</Typography>
        <DisplayDiagnosisCodes codes={entry.diagnosisCodes || []} />
      </CardContent>
    </Card>
  );
};

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Healing color="success" />
          <Typography variant="h6">Health Check</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Date: {entry.date}
        </Typography>
        <Typography>{entry.description}</Typography>
        <Typography variant="body2">Health Check Rating: {entry.healthCheckRating}</Typography>
        <Typography variant="body2">Specialist: {entry.specialist}</Typography>
        <DisplayDiagnosisCodes codes={entry.diagnosisCodes || []} />
      </CardContent>
    </Card>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const assertNever = (value: never): never => {
  throw new Error(`Unexpected object: ${JSON.stringify(value)}`);
};

export default EntryDetails;

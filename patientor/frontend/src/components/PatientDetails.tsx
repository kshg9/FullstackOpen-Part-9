import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../constants';
import { NewEntry, Patient } from '@backend/types';
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetails from './EntryDetails';
import AddNewEntryForm from './EntryForm';
import patientService from '../services/patients';

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        console.log(response.data);
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };
    fetchPatient();
  }, [id]);

  const handleNewEntry = async (entry: NewEntry) => {
    try {
      if (id) {
        const UpdatedPatient = await patientService.createEntry(id, entry);
        setPatient(UpdatedPatient);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.data;
        setError(status || 'Failed to add new entry');
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
      console.error('Error adding new entry:', error);
    }
  };

  if (!patient) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>{patient.name}</h2>
      {/* Render gender icon */}
      {patient.gender === 'male' && <MaleIcon />}
      {patient.gender === 'female' && <FemaleIcon />}
      {patient.gender === 'other' && <TransgenderIcon />}
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>

      {error && (
        <div
          style={{ color: 'red', padding: '10px', border: '1px solid red', marginBottom: '10px' }}
        >
          {error}
        </div>
      )}

      <AddNewEntryForm
        patientId={patient.id}
        onSubmit={handleNewEntry}
        error={error || undefined}
      />

      <h3>Entries</h3>
      {patient.entries.length == 0 ? (
        <em>No entries</em>
      ) : (
        patient.entries.map((entry) => <EntryDetails key={entry.id} entry={entry} />)
      )}
    </div>
  );
};

export default PatientDetails;

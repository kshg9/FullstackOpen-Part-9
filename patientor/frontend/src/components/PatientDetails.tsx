import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { useParams } from 'react-router-dom';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

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
    </div>
  );
};

export default PatientDetails;

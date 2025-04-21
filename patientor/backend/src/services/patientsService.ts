import patientsData from '../../data/patients';
import { NewPatientEntry, Patient, NonSensitivePatient, Entry, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = () => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  }) as NonSensitivePatient[];
};

const getPatientById = (id: string): Patient => {
  const patient = patientsData.find((p) => p.id === id);
  if (!patient) {
    throw new Error(`Patient with id ${id} not found`);
  }
  return patient;
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    ...patient,
    id: uuid(),
    entries: []
  };
  patientsData.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Patient => {
  const patient = patientsData.find((p) => p.id === patientId);
  console.log('Patient:', patient);
  if (!patient) {
    throw new Error(`Patient with id ${patientId} not found`);
  }
  const newEntry: Entry = {
    ...entry,
    id: uuid()
  };
  patient.entries = [...patient.entries, newEntry];
  return patient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getPatientById,
  addPatient,
  addEntry
};

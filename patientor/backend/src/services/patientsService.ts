import patientsData from "../../data/patients";
import { NewPatientEntry, Patient, PreviewPatient } from "../types";
import { v1 as uuid } from "uuid";

const getEntries = () => {
  return patientsData;
};

const getNonSensitiveEntries = (): PreviewPatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  }) as PreviewPatient[];
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
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getPatientById,
  addPatient,
};

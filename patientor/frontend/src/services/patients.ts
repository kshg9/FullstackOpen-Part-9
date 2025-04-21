import axios from 'axios';
import { Patient } from '@backend/types';
import { PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';
import { NewEntry } from '@backend/types';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (patientId: string, object: NewEntry) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients/${patientId}/entries`, object);

  return data;
};

export default {
  getAll,
  create,
  createEntry
};

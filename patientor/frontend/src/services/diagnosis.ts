import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Diagnosis } from '@backend/types';

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

const getByCode = async (code: string) => {
  const { data } = await axios.get<Diagnosis>(`${apiBaseUrl}/diagnoses/${code}`);

  return data;
};

export { getAll, getByCode };

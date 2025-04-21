import diagnosesData from '../../data/diagnoses';

const getEntries = () => {
  return diagnosesData;
};

const getByCode = (code: string) => {
  const diagnosis = diagnosesData.find((d) => d.code === code);
  if (!diagnosis) {
    throw new Error(`Diagnosis with code ${code} not found`);
  }
  return diagnosis;
};

export default {
  getEntries,
  getByCode
};

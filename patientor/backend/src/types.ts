import { z } from "zod";
import { NewPatientSchema } from "./utils";

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

// export type Patient = {
//   id: string;
//   name: string;
//   dateOfBirth: string;
//   ssn: string;
//   gender: Gender;
//   occupation: string;
// };
export interface Patient extends NewPatientEntry {
  id: string;
}
export type PreviewPatient = Omit<Patient, "ssn">;
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

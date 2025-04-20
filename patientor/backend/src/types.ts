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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

// export type Patient = {
//   id: string;
//   name: string;
//   dateOfBirth: string;
//   ssn: string;
//   gender: Gender;
//   occupation: string;
// };

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatientEntry {
  id: string;
  entries: Entry[];
}

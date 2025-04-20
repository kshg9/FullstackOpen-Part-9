import { z } from "zod";
import { Gender } from "./types";

// // Manage Strings
// const isString = (text: unknown): text is string => {
//   return typeof text === "string" || text instanceof String;
// };

// const parseString = (text: unknown): string => {
//   if (!isString(text)) {
//     throw new Error("Incorrect or missing string: " + text);
//   }
//   return text;
// };

// // Manage Dates
// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const parseDate = (date: unknown): string => {
//   if (!isString(date) || !isDate(date)) {
//     throw new Error("Incorrect or missing date: " + date);
//   }
//   return date;
// };

// // Manage Gender
// const isGender = (param: string): param is Gender => {
//   return Object.values(Gender)
//     .map((g) => g.toString())
//     .includes(param);
// };

// const parseGender = (param: unknown): Gender => {
//   if (!isString(param) || !isGender(param)) {
//     throw new Error("Incorrect Gender: " + param);
//   }
//   return param;
// };

export const NewPatientSchema = z.object({
  name: z.string().nonempty(),
  dateOfBirth: z.coerce.date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const PatientSchema = NewPatientSchema.extend({
  id: z.string().uuid(),
});

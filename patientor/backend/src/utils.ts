import { z } from 'zod';
import { Diagnosis, Gender, NewEntry } from './types';

// Define the schema for a new patient entry

// Patient schema
export const NewPatientSchema = z.object({
  name: z.string().nonempty(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

// Diagnosis schema helpers
const BaseEntrySchema = z.object({
  id: z.string().uuid(),
  date: z.string().date(),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.number().int().min(0).max(3)
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date()
    })
    .optional()
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string()
  })
});

const EntrySchema = z.discriminatedUnion('type', [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema
]);

// Patient schema with entries
export const PatientSchema = NewPatientSchema.extend({
  id: z.string().uuid(),
  entries: z.array(EntrySchema)
});

// Helper functions for Entries
const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

// Entry schema without ID
const EntrySchemaWithoutId = z.discriminatedUnion('type', [
  HealthCheckEntrySchema.omit({ id: true }),
  OccupationalHealthcareEntrySchema.omit({ id: true }),
  HospitalEntrySchema.omit({ id: true })
]);

export const toNewEntry = (object: unknown): NewEntry => {
  const newEntry = EntrySchemaWithoutId.parse(object);
  const diagnosisCodes = parseDiagnosisCodes(object);

  return { ...newEntry, diagnosisCodes };
};

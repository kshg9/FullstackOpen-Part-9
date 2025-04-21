import express, { Request, Response } from 'express';
import patientsService from '../services/patientsService';
import { NewPatientEntry, NonSensitivePatient, Patient } from '../types';
import { NewPatientSchema, toNewEntry } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.post('/', (req: Request<NewPatientEntry>, res) => {
  try {
    const newPatient = NewPatientSchema.parse(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
        .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
        .join(', ');
      res.status(400).send(errorMessage); // Send string directly, not wrapped in object
    } else if (error instanceof Error) {
      res.status(400).send(error.message); // Send string directly
    } else {
      res.status(400).send('Unknown error occurred'); // Send string directly
    }
  }
});

router.get('/:id', (req, res) => {
  const patient: Patient = patientsService.getPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const patientId = req.params.id;
    const newEntry = toNewEntry(req.body);

    const addedEntry = patientsService.addEntry(patientId, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
        .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
        .join(', ');
      res.status(400).send(errorMessage); // Send string directly, not wrapped in object
    } else if (error instanceof Error) {
      res.status(400).send(error.message); // Send string directly
    } else {
      res.status(400).send('Unknown error occurred'); // Send string directly
    }
  }
});

export default router;

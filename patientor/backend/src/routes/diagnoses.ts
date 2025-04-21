import express, { Response } from 'express';
import diagnosesService from '../services/diagnosesService';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosesService.getEntries());
});

router.get('/:code', (req, res) => {
  const { code } = req.params;
  const diagnosis = diagnosesService.getByCode(code);
  if (!diagnosis) {
    res.status(404).send({ error: 'Diagnosis not found' });
  }
  res.send(diagnosis);
});

export default router;

import express, { Request, Response } from "express";
import patientsService from "../services/patientsService";
import { NewPatientEntry, PreviewPatient } from "../types";
import { NewPatientSchema } from "../utils";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<PreviewPatient[]>) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.post("/", (req: Request<NewPatientEntry>, res) => {
  try {
    const newPatient = NewPatientSchema.parse(req.body);
    console.log(newPatient);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

// router.get("/:id", (req, res) => {});

export default router;

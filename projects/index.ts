import express from "express";
import { calculateBmi } from "./calculateBmi";
import { calculateExercise } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  const bmi = calculateBmi(weight, height);
  console.log(bmi);
  res.json({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).send({ error: "parameters missing" });
    return;
  }

  if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  try {
    const result = calculateExercise(
      daily_exercises.map(Number),
      Number(target)
    );
    res.json(result);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_e) {
    res.status(500).send({ error: "Internal server error" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {

    // http://localhost:3003/bmi?height=180&weight=72
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if((!height) || (!weight) ) {
       return res.json({ error: "malformatted parameters" });
    }

    const bmi = calculateBmi(height, weight);

   return res.json({ height, weight, bmi });
});

app.post("/exercises", (req, res) => {
    const { daily_exercises, target }: {daily_exercises: number[], target: number} = req.body;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exercises = daily_exercises.map((n: any) => Number(n));

    if(!daily_exercises || !target) {
        return res.json({ error: "parameters missing" });
    }
    else if( typeof(target) !== "number" || exercises.includes(NaN) ) {
        return res.json({ error: "malformatted parameters" });
    }

    const result = calculateExercises( daily_exercises, target);

    return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
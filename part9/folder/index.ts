import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

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

    const bmi = calculateBmi(height, weight)

   return res.json({ height, weight, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
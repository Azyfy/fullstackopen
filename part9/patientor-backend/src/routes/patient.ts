import express from "express";

import patientService from "../services/patientService";
import newPatientValidation from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getEntriesWithoutSsn());
});

router.post("/", (req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = newPatientValidation(req.body);
    const newPatient = patientService.addPatient(
        { name, dateOfBirth, ssn, gender, occupation }
    );
    res.json(newPatient);
});

export default router;
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

router.get("/:id", (req, res) => {
    const id: string = req.url.slice(1);
    const patients = patientService.getEntries();

    const patient = patients.find(p => p.id === id);

    if(!patient) {
        return res.json({
            error: "No patient found!"
        });
    }

    return res.json(patient);
});

router.post("/:id/entries", (req, res) => {
    const entry = req.body.entry;
    const id = req.body.patientId;

    const newEntry =  patientService.addEntry(entry, id);

    if (newEntry === "No patient") {
        return res.json({
            error: "No patient found!"
        })
    }

    return res.json(newEntry);
});

export default router;
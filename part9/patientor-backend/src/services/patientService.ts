import patientsData from "../../data/patients";

import { PatientsEntry, NewPatientEntry } from "../types";

import {v1 as uuid} from 'uuid';

const patients: Array<PatientsEntry> = patientsData as Array<PatientsEntry>;

const getEntries = () => {
    return patients;
};

const getEntriesWithoutSsn = 
(): Omit<PatientsEntry, "ssn">[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addPatient = 
    ( newEntry: NewPatientEntry ): Omit<PatientsEntry, "entries"> => {

        const newPatient = {
            id: uuid(),
            ...newEntry
        };

        patients.push(newPatient);
        return newPatient;

    };

export default {
    getEntries,
    getEntriesWithoutSsn,
    addPatient
};
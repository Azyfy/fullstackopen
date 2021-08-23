import patientsData from "../../data/patients.json";

import { PatientsEntry, NewPatientEntry } from "../types";

import {v1 as uuid} from 'uuid';

const patients: Array<PatientsEntry> = patientsData;

const getEntries = () => {
    return patients;
};

const getEntriesWithoutSsn = 
(): Omit<PatientsEntry, "ssn">[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = 
    ( newEntry: NewPatientEntry ): PatientsEntry => {

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
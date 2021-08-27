import patientsData from "../../data/patients";

import { PatientsEntry, NewPatientEntry, Entry, EntryWithoutId } from "../types";

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
            ...newEntry,
            entries: []
        };

        patients.push(newPatient);
        return newPatient;

    };

const addEntry = ( newData: EntryWithoutId, id: string ): Entry | string => {

    const patient = patients.find(patient => patient.id === id);

    const newEntry = {
        id: uuid(),
        ...newData
    }

    if(!patient) {
        return "No patient"
    }
 
    patient?.entries!.push(newEntry);

    return newEntry;
}

export default {
    getEntries,
    getEntriesWithoutSsn,
    addPatient,
    addEntry
};
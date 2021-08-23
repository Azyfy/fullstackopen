import patientsData from "../../data/patients.json" 

import { PatientsEntry } from "../types"

const patients: Array<PatientsEntry> = patientsData

const getEntries = () => {
    return patients
}

const getEntriesWithoutSsn = 
(): Omit<PatientsEntry, "ssn">[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
}

export default {
    getEntries,
    getEntriesWithoutSsn
}
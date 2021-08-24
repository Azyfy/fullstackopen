import { NewPatientEntry } from "./types";
import { Gender } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const newPatientValidation = (patientBody: any): NewPatientEntry => {
    const newPatient: NewPatientEntry = {
        
        name: parseName(patientBody.name),
        dateOfBirth: parseDate(patientBody.dateOfBirth),
        gender: parseGender(patientBody.gender),
        occupation: parseOccupation(patientBody.occupation),
        ssn: parseSsn(patientBody.ssn)
    };

    return newPatient;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name");
    }

    return name;
};

const isString = (string: unknown): string is string => {
    return typeof string === "string" || string instanceof String;
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date" + date);
    }
    return date;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing gender:" + gender);
    }
    return gender;
};

const isGender = (gender: string): gender is Gender => {
    return ["male", "female"].includes(gender);
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation");
    }
    return occupation;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error("Incorrect or missing ssn");
    }
    return ssn;
};

export default newPatientValidation;
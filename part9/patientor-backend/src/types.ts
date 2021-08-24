export interface DiagnosesEntry {
    code: string,
    name: string,
    latin?: string,
}

export interface PatientsEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: Gender,
    occupation: string,
    ssn: string,
}

export type NewPatientEntry = Omit<PatientsEntry, "id">;

export enum Gender {
    Male = "male",
    Female = "female"
}
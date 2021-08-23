export interface DiagnosesEntry {
    code: string,
    name: string,
    latin?: string,
}

export interface PatientsEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: string,
    occupation: string,
    ssn: string,
}
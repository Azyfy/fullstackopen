export interface DiagnosesEntry {
    code: string,
    name: string,
    latin?: string,
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface PatientsEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: Gender,
    occupation: string,
    ssn: string,
   // entries: Entry[]
}

// export type PublicPatient = Omit<PatientsEntry, 'ssn' | 'entries' >

export type NewPatientEntry = Omit<PatientsEntry, "id">;

export enum Gender {
    Male = "male",
    Female = "female"
}
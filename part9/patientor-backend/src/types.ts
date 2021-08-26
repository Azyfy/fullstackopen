export interface DiagnosesEntry {
    code: string,
    name: string,
    latin?: string,
}

// Define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
// type EntryWithoutId = UnionOmit<Entry, 'id'>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry = | HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnosesEntry['code']>;
  }

  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

  interface HospitalEntry extends BaseEntry {
      type: "Hospital";
      discharge: { date: string, criteria: string };
  }

  interface OccupationalHealthcareEntry extends BaseEntry {
      type: "OccupationalHealthcare";
      employerName: string;
      sickLeave?: { startDate: string, endDate: string };
  }

export interface PatientsEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: Gender,
    occupation: string,
    ssn: string,
    entries?: Entry[]
}

// export type PublicPatient = Omit<PatientsEntry, 'ssn' | 'entries' >

export type NewPatientEntry = Omit<PatientsEntry, "id" | "entries">;

export enum Gender {
    Male = "male",
    Female = "female"
}
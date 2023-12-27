export interface Diagnoses {
    code: string,
    name: string,
    latin?: string
}

export interface BaseEntry {
    id: string,
    description: string,
    date: string,
    specialist: string,
    diagnosisCodes: Array<Diagnoses['code']>
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck",
    healthCheckRating: HealthCheckRating
}

export interface Discharge {
    date: string,
    criteria: string
}

export interface HospitalEntry extends BaseEntry{
    type: "Hospital",
    discharge: Discharge
}

export interface SickLeave {
    startDate: string,
    endDate: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare',
    sickLeave?: SickLeave,
    employerName: string
}

export type Entry = HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry; 

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type SSN_HIDDEN = Omit<Patient, 'ssn'>; 
export type NewPatient = Omit<Patient, 'id'>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>; 
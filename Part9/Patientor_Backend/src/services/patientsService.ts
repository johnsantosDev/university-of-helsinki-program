import {v1 as uuid} from 'uuid'; 

import { patientsData } from "../data/patients";
import { NewPatient, Patient, SSN_HIDDEN } from "../types";

const getAllPatientsWithoutSSN = (): SSN_HIDDEN [] => {
    return patientsData.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    })); 
}; 

const addPatients = (newEntry: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...newEntry
    };
    patientsData.push(newPatient); 
    return newPatient;
}; 

const getPatientById = (id: string): Patient | undefined => {
    return patientsData.find(p => p.id === id); 
}; 

export default {
    getAllPatientsWithoutSSN,
    addPatients,
    getPatientById
}; 
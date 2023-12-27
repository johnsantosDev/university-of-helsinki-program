import { diagnosesData } from "../data/diagnoses";
import { Diagnoses } from "../types";

const getAllDiagnoses = (): Diagnoses [] => {
    return diagnosesData;
}; 

export default {
    getAllDiagnoses
}; 
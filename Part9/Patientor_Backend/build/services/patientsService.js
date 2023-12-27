"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = require("../data/patients");
const getAllPatientsWithoutSSN = () => {
    return patients_1.patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
exports.default = {
    getAllPatientsWithoutSSN
};

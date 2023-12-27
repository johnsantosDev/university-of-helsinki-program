"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_1 = require("../data/diagnoses");
const getAllDiagnoses = () => {
    return diagnoses_1.diagnosesData;
};
exports.default = {
    getAllDiagnoses
};

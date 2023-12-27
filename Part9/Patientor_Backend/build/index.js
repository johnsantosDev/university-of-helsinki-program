"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosesRouter_1 = __importDefault(require("./routes/diagnosesRouter"));
const patientsRouter_1 = __importDefault(require("./routes/patientsRouter"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use('/api/diagnoses', diagnosesRouter_1.default);
app.use('/api/patients', patientsRouter_1.default);
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});

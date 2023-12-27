import express from 'express'; 
import cors from 'cors'; 

import diagnosesRouter from './routes/diagnosesRouter';
import patientsRouter from './routes/patientsRouter'; 

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json()); 

const PORT = 3001; 

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter); 

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`); 
}); 


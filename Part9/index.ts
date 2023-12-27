import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

const app = express(); 

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const values = Object.values(req.query);
    const errorMessage = 'Malformatted parameters!';
    if(values.length < 2)  {
        res.send({error: errorMessage});
    } else {
        for(let i = 0; i < values.length; i++) {
            if(isNaN(Number(values[i]))) res.send({error: errorMessage});
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const bmi = calculateBmi(height, weight);
        res.send({
            weight: weight,
            height: height,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            bmi: bmi
        });
    }
});

app.post('/exercises',  (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if(daily_exercises.length < 1 || !target) {
        throw new Error('Not enough parameters!');
    } 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    for(let i = 0; i < daily_exercises.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        if(isNaN(daily_exercises[i]) || isNaN(target)) {
            throw new Error('malformatted parameters!');
        }
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result = calculateExercise(daily_exercises, target); 
        res.send(result);
    } catch (error: unknown) {
        let errorMessage = ''; 
        if(error instanceof Error) {
            errorMessage += error.message;
        }
        res.send({error: errorMessage});
    }
    res.end();
 });

const PORT  = 3003; 
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

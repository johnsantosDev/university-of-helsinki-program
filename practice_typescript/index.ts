import express from 'express'; 

import { calculator2, Operation } from './calculator';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.post('/calculate', (req, res) => {
    const {value1, value2, op} = req.body;
    const value3: any = 1;
    const result = calculator2(value1, value2, op as Operation);
    res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
export const calculateBmi = (height: number, weight: number):any => {
    const heightInMeters = height/100;
    const bmi = weight/(heightInMeters * heightInMeters);
    if(bmi < 80) return 'Normal (healthy weight)';
    if(bmi > 80) return 'Overweight (unhealthy)';
};

interface ProvidedValues {
    height: number,
    weight: number
}

const parseArguments = (args: string[]): ProvidedValues => {
    if(args.length < 4) throw new Error('Not enough arguments!');
    if(args.length > 4) throw new Error('Too many argunents'); 

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values are not numbers!');
    }
};

try {
    const {height, weight} = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch(error: unknown) {
    let errorMessage = 'Something bad happened : ';
    if(error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}

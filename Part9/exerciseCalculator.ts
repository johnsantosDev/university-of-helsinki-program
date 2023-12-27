interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercise = (args: number[], target: number): Result => {
    const numOfDays = args.length;
    let trainingDaysTotal = 0; 

    for(let i = 0; i < args.length; i++) {
        if(args[i] > 0) {
            trainingDaysTotal++;
        }
    }

    const averageExercise = args.reduce((acc, cur) => acc + cur, 0)/args.length; 

    let exerciseSuccess = false; 
    let exerciseRating = 0;
    let exerciseRatingDescription = ''; 

    if(trainingDaysTotal < 3) {
        exerciseSuccess = false;
        exerciseRating += 1; 
        exerciseRatingDescription += 'Not well done!';
    } 
    if(trainingDaysTotal > 3 && trainingDaysTotal <= 5) {
        exerciseSuccess = false;
        exerciseRating += 2;
        exerciseRatingDescription += 'not too bad but could be better';
    } 
    if(trainingDaysTotal > 5) {
        exerciseSuccess = true;
        exerciseRating += 3;
        exerciseRatingDescription += 'well done, good job';
    }

    return {
        periodLength: numOfDays,
        trainingDays: trainingDaysTotal,
        success: exerciseSuccess,
        rating: exerciseRating,
        ratingDescription: exerciseRatingDescription,
        target: target,
        average: averageExercise
    };
};

interface ArgumentParameters {
    target: number,
    trainingData: number[]
}

const parseArgument = (args: string[]): ArgumentParameters => {
    if(args.length < 4) throw new Error('Not enough arguments'); 
    let targetValue = 0;
    const trainingDataValues: number[] = [];

    for(let i = 3; i < args.length; i++) {
        if(!isNaN(Number(args[i]))) {
            trainingDataValues.push(Number(args[i]));
        } else {
            throw new Error('Provided wrong type of values');
        }
    }

    if(!isNaN(Number(args[2]))) {
        targetValue = Number(args[2]);
    }

    return {
        target: targetValue,
        trainingData: trainingDataValues
    };
};

try {
    const {target, trainingData} = parseArgument(process.argv); 
    console.log(calculateExercise(trainingData, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened: ';
    if(error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}

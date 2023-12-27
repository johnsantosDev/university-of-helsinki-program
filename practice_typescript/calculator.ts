export type Operation = 'multiply' | 'add' | 'divide'; 
type Result = number | string;

const calculator1 = (a: number, b: number, op: Operation): Result => {
    if(op === 'multiply') {
        return a * b;
    } else if(op === 'add') {
        return a + b;
    } else if(op === 'divide') {
        if(b === 0) {
            return 'cannot divide by 0';
        }
        return a / b;
    }
}

export const calculator2 = (a : number, b: number, op: Operation): Result => {
   switch(op) {
    case 'multiply':
        return a * b;
    case 'add': 
        return a + b; 
    case 'divide': 
        if(b === 0) throw new Error ('Cannot divide by 0');
        return a / b; 
    default: 
        throw new Error('Operation is not multiply, add or divide!')
   }
}

try {
    console.log(calculator2(5, 0, 'divide'))
} catch (error: unknown) {
    let errorMsg = 'Something went wrong! '
    if(error instanceof Error) {
        errorMsg += error.message
    }
    console.log(errorMsg)
}

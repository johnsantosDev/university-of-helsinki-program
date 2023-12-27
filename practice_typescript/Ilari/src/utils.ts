import { NewDiaryEntry, Visibility, Weather } from "./types"

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String; 
}

const parseComment = (comment: unknown): string => {
    if(!isString(comment)) {
        throw new Error('Incorrect or missing comment!')
    }
    return comment;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}

const parseDate = (date: unknown): string => {
    if(!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date ' + date)
    }
    return date; 
}

const isWeather = (param: string): param is Weather => {
    return Object.values(Weather).map(v => v.toString()).includes(param); 
}

const parseWeather = (weather: unknown): Weather => {
    if(!isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather ' + weather)
    }
    return weather; 
}

const isVisibility = (param: string): param is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(param); 
}

const parseVisibility = (visibility: unknown): Visibility => {
    if(!isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility ' + visibility); 
    }
    return visibility; 
}

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect of missing data')
    } 

    if('date' in object && 'weather' in object && 'visibility' in object && 'comment' in object) {
        const newDiary = {
            date: parseDate(object.date),
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility),
            comment: parseComment(object.comment)
        }
        return newDiary
    }

    throw new Error('Incorrect data: some fields are missing!')
}

export default toNewDiaryEntry;
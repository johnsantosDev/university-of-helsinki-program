import axios from 'axios'; 
import { Diary, NewDiary } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

const getDiaries = () => axios
                    .get<Diary[]>(baseUrl)
                    .then(response => response.data);

const addDiary = async (diary: NewDiary) => {
    try {
        const response = await axios.post<Diary>(baseUrl, diary).then(response => response.data)
        return response; 
    } catch (error) {
        if(axios.isAxiosError(error)) {
            throw new Error(error.response?.data)
        }
    }  
}

export default {
    getDiaries,
    addDiary
}
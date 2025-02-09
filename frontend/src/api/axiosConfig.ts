import axios from 'axios';

const baseURL: string = 'http://localhost:3000';

const instanceAxios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

export default instanceAxios;

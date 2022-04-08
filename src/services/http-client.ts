import axios from 'axios';

const Http = axios.create({
    baseURL: process.env.BASE_URL // Import this from env file
});

export { Http };
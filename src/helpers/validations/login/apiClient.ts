import axios from "axios";

export const apiClient = axios.create({
    baseURL: 'http://localhost:5000', // Replace this with your actual base URL
});
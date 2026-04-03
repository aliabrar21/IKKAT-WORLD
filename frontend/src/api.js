import axios from 'axios';

const api = axios.create({
    baseURL: `http://${window.location.hostname}:5000/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        try {
            const parsedInfo = JSON.parse(userInfo);
            if (parsedInfo.token) {
                config.headers.Authorization = `Bearer ${parsedInfo.token}`;
            }
        } catch (error) {
            console.error('Failed to parse user info', error);
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;

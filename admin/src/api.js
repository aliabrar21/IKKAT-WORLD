import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust if needed
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const adminInfoStr = localStorage.getItem('adminInfo');
    if (adminInfoStr) {
        try {
            const adminInfo = JSON.parse(adminInfoStr);
            if (adminInfo.token) {
                config.headers.Authorization = `Bearer ${adminInfo.token}`;
            }
        } catch (e) { }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;

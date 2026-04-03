export const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
        return url;
    }
    const apiBaseUrl = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : 'https://ikkat-world-api.onrender.com/api');
    const serverUrl = apiBaseUrl.replace(/\/api$/, '');
    return `${serverUrl}${url.startsWith('/') ? url : '/' + url}`;
};

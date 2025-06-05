import axios from 'axios';
import store from '../redux/store';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_CAMPUS_API,
})

axiosInstance.interceptors.request.use(config => {
    const state = store.getState();
    const apiBase = state.api?.apiBase || import.meta.env.VITE_CAMPUS_API;
    config.baseURL = apiBase;
    return config;
});

export default axiosInstance;
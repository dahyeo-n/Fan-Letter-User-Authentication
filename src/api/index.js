import axios from 'axios';
import { logout } from '../store/modules/authSlice';
// import store from '../store/config/configStore';

let store;
import('../store/config/configStore').then((module) => {
    store = module.default();
});

export const authApi = axios.create({
    baseURL: 'https://moneyfulpublicpolicy.co.kr',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const jsonApi = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

authApi.interceptors.request.use(
    (config) => {
        // header에 token 넣기
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken} `;
        }
        return config;
    },
    (err) => {
        return Promise.reject(arr);
    }
);

authApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        console.log('err:', err);
        alert(err.response.data.message);
        if (err.response.data.message === '토큰이 만료되었습니다. 다시 로그인 해주세요.') {
            // 로그아웃 처리
            return store.dispatch(logout());
        }
        return Promise.reject(err);
    }
);

jsonApi.interceptors.request.use(
    async (config) => {
        await authApi.get('/user');
        if (data.success) return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

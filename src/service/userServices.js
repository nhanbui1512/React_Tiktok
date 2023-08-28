import * as request from '../utils/request';
import axios from 'axios';

export const getSugggested = async ({ page, perPage }) => {
    try {
        const res = await request.get('users/suggested', {
            params: {
                page,
                per_page: perPage,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async ({ nickname, token = '' }) => {
    try {
        const res = await request.get(`users/${nickname}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getCurrentUser = async ({ token }) => {
    try {
        const res = await request.get(`auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getFollowingUsers = async ({ page = 1, token = '' }) => {
    try {
        const res = await axios.get(`https://tiktok.fullstack.edu.vn/api/me/followings`, {
            params: {
                page: page,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        return error;
    }
};

export const FollowUser = async ({ token = '', idUser }) => {
    try {
        const res = await axios.post(
            `https://tiktok.fullstack.edu.vn/api/users/${idUser}/follow`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return res;
    } catch (error) {
        throw error;
    }
};

export const UnFollow = async ({ token = '', idUser }) => {
    try {
        const res = await axios.post(
            `https://tiktok.fullstack.edu.vn/api/users/${idUser}/unfollow`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return res;
    } catch (error) {
        throw error;
    }
};

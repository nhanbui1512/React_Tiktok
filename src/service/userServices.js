import * as request from '../utils/request';
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

export const getUser = async ({ nickname }) => {
    try {
        const res = await request.get(`users/${nickname}`);
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

export const FollowUser = async ({ token, idUser }) => {
    try {
        const res = await request.post(`users/${idUser}/follow`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: '*/*',
                Connection: 'keep-alive',
                AcceptEncoding: 'gzip, deflate, br',
            },
        });
        return res;
    } catch (error) {}
};

import * as request from '../utils/request';
export const login = async ({ email, password }) => {
    try {
        const res = await request.post('auth/login', {
            email: email,
            password: password,
        });
        return res;
    } catch (error) {
        return error;
    }
};

export const getCurrentUser = async ({ token }) => {
    try {
        const res = await request.post('auth/me', {
            token,
        });
        return res;
    } catch (error) {}
};

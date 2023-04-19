import * as request from '../utils/request';
export const login = async ({ page, perPage }) => {
    try {
        const res = await request.get('auth/login', {
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

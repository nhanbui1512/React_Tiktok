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

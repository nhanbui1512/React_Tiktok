import request from '../utils/request';

export const getCommentsOfVieo = async ({ idVideo, token, page }) => {
    const result = await request.get(`videos/${idVideo}/comments?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return result;
};

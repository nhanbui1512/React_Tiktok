import request from '../utils/request';

export const likeVideo = async ({ token, idVideo }) => {
    try {
        const res = await request.post(
            `videos/${idVideo}/like`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return res;
    } catch (error) {}
};

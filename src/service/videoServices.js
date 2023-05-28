import * as request from '../utils/request';

export const getVideos = async ({ type, page }) => {
    try {
        const res = await request.get('videos', {
            params: {
                type,
                page: page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getFollowingVideos = async ({ page, token }) => {
    try {
        const res = await request.get('videos', {
            params: {
                type: 'following',
                page: page,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

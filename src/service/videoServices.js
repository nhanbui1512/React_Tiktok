import axios from 'axios';
import * as request from '../utils/request';

export const getVideos = async ({ type, page, token = '' }) => {
  try {
    const res = await request.get('videos', {
      params: {
        type,
        page: page,
      },

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
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
    throw error;
  }
};

export const getVideosUserLiked = async ({ idUser, page = 1, token = '' }) => {
  try {
    const res = await request.get(`users/${idUser}/liked-videos?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getOneVideo = async ({ idVideo, token = '' }) => {
  try {
    const res = await request.get(`videos/${idVideo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const CreateNewVideo = async ({ formdata, token }) => {
  var response = await axios.post(`https://tiktok.fullstack.edu.vn/api/videos`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

import request from '../utils/request';
import { getCookie } from './local/cookie';

export const getCommentsOfVieo = async ({ idVideo, token, page }) => {
  const result = await request.get(`videos/${idVideo}/comments?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result;
};

export const createNewComment = async ({ content, idVideo, token }) => {
  try {
    const response = await request.post(
      `videos/${idVideo}/comments`,
      {
        comment: content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (idComment) => {
  const token = getCookie('authToken') || '';
  try {
    const response = await request.delete(`comments/${idComment}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

import * as request from '../utils/request';
export const register = async (email, password) => {
  try {
    const res = await request.post('auth/register', {
      type: 'email',
      email: email,
      password: password,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

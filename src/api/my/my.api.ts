import api from '@/api/api';
import { MyFormData } from '@/types/my';

const PATH = '/users';

// GET
const getMyInfo = async () => {
  const res = await api.get(`${PATH}/me`);
  return res.data.data;
};

// PATCH
const patchMyInfo = async (data: MyFormData) => {
  const res = await api.patch(`${PATH}`, data);
  return res.data.data;
};

export { getMyInfo, patchMyInfo };

import * as request from '../libs/requests.js';

export const commonService = (baseUrl) => {
  return {
    getAll: async (id) => {
      const query = new URLSearchParams({
        where: `_ownerId="${id}"`,
      });
      const result = await request.get(`${baseUrl}/?${query}`);
      return result;
    },
    create: async (data) => {
      const result = await request.post(`${baseUrl}`, data);
      return result;
    },
    edit: async (data) => {
      const result = await request.put(`${baseUrl}/${data._id}`, data);
      return result;
    },
    getOne: async (id) => {
      const result = await request.get(`${baseUrl}/${id}`);
      return result;
    },
    remove: async (id) => {
      const response = await request.remove(`${baseUrl}/${id}`);
      return response;
    },
  };
};
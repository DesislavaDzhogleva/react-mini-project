import * as request from '../libs/requests.js';
const baseUrl = 'http://localhost:3030/data/orders';
export const getAll = async (id) => {
    const query = new URLSearchParams({
        where: `_ownerId="${id}"`,
    });

    const result = await request.get(`${baseUrl}/?${query}&sortBy=_createdOn desc`);
    return result;
};

export const create = async (order) => {
    const result = await request.post(`${baseUrl}`, order);
    return result;
}

export const edit = async (order) => {
    const result = await request.put(`${baseUrl}/${order._id}`, order);
    return result;
}

export const getOne = async (id) => {
    const result = await request.get(`${baseUrl}/${id}`);
    return result;
}

export const remove = async (id) => {
    const response = await request.remove(`${baseUrl}/${id}`);
    return response;
}
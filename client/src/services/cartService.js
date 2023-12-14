import * as request from '../libs/requests.js';
const baseUrl = 'http://localhost:3030/data/cartItems';

export const create = async (cartItem) => {
    const result = await request.post(`${baseUrl}`, cartItem);
    return result;
}

export const edit = async (cartItem) => {
    const result = await request.put(`${baseUrl}/${cartItem._id}`, cartItem);
    return result;
}

export const getCart = async (id) => {
    const query = new URLSearchParams({
        where: `_ownerId="${id}"`,
    });
    const result = await request.get(`${baseUrl}/?${query}&sortBy=_createdOn desc`);
    return result;
}

export const remove = async (id) => {
    const response = await request.remove(`${baseUrl}/${id}`);
    return response;
}
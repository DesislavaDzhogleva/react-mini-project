import * as request from '../libs/requests.js';
const baseUrl = 'http://localhost:3030/data/meals';
export const getAll = async (id) => {
    const query = new URLSearchParams({
        where: `_ownerId="${id}"`,
    });

    const result = await request.get(`${baseUrl}/?${query}&sortBy=_createdOn desc`);
    return result;
};

export const create = async (meal) => {
    const result = await request.post(`${baseUrl}`, meal);
    return result;
}

export const edit = async (meal) => {
    const result = await request.put(`${baseUrl}/${meal._id}`, meal);
    return result;
}

export const getOne = async (id) => {
    const result = await request.get(`${baseUrl}/${id}`);
    return result;
}

export const getAllById = async (ids) => {
    const stringRepresentation = ids.map(value => `"${value}"`).join(", ");
    // const query = new URLSearchParams({
    //     where: `_id IN ${stringRepresentation}"`,
    // });

    const result = await request.get(`${baseUrl}/?where=_id IN (${stringRepresentation})`);
    return result;
}

export const remove = async (id) => {
    const response = await request.remove(`${baseUrl}/${id}`);
    return response;
}
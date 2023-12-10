import * as request from '../libs/requests.js';
const baseUrl = 'http://localhost:3030/data/meals';
export const getAll = async (id) => {
    // const query = new URLSearchParams({
    //     load: `owner=ownerId:users`,
    // });

    const query = new URLSearchParams({
        where: `_ownerId="${id}"`,
    });

    const result = await request.get(`${baseUrl}/?${query}`);
    console.log(result);
    return result;
};

export const create = async (meal) => {
    console.log(meal.mealImage);
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

export const remove = async (id) => {
    const response = await request.remove(`${baseUrl}/${id}`);
    return response;
}
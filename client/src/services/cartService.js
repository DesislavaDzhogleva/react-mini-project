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

export const getCart = async (id, restaurant) => {
    if(!id || !restaurant){
        return null;
    }
    const query = new URLSearchParams({
        where: `_ownerId="${id}" AND pickedRestaurant="${restaurant}"`
    });
    
    const queryString = query.toString().replace(/\+/g, '%20');

    const result = await request.get(`${baseUrl}/?${queryString}&sortBy=_createdOn desc`);
    return result;
}

export const remove = async (id) => {
    const response = await request.remove(`${baseUrl}/${id}`);
    return response;
}

export const removeAll = async (id, restaurantId) => {
    const cartItems = await getCart(id, restaurantId);
    const removeItemPromises = [];
    
    (cartItems).forEach(x => {
        removeItemPromises.push(request.remove(`${baseUrl}/${x._id}`));
    });

    const response = await Promise.all(removeItemPromises);
    
    return response;
}
import Table from 'react-bootstrap/Table';
import * as ordersService from '../../services/ordersService';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import * as restaurantService from '../../services/restaurantService';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const { state } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const orders = await ordersService.getAll(state.user?._id);
                const finalOrders = await Promise.all(
                    orders.map(async (order) => {
                        const totalPrice = order.mappedCart.reduce((sum, item) => sum + item.totalPrice, 0);

                        const restaurantData = await restaurantService.getOne(order.pickedRestaurant);
                        const finalOrder = {
                            orderId: order._id,
                            totalPrice,
                            dateOfOrder: new Date(order._createdOn).toLocaleString(), // Format date as needed
                            restaurant: restaurantData.restaurantName,
                        };

                        return finalOrder;
                    })
                );

                setOrders(finalOrders);
            } catch (error) {
                console.log(`Error in meal Item component: ${error.message}`);
            }
        };

        fetchData();

    }, [state.user?._id]);

    console.log(orders);

    return (
        <section className='m-4'>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Restaurant</th>
                        <th>Total Price</th>
                        <th>Date of order</th>
                        <th>Datails</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((item, index) => (
                        <tr key={item.orderId}>
                            <td>{index + 1}</td>
                            <td>{item.restaurant}</td>
                            <td>$ {item.totalPrice}</td>
                            <td>{item.dateOfOrder}</td>
                            <td>
                                <Link to={`/orderDetails/${item.orderId}`}>View Details</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </section>
    )
}


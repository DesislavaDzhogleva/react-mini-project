import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import * as ordersService from '../../services/ordersService';
import * as restaurantService from '../../services/restaurantService';
import Unauthorized from '../Unauthorized/Unauthorized';
import styles from '../menu/Menu.module.css';
import OrderMealItem from './OrderMealItem';

export default function OrderDetails() {
  const { state } = useAuth();
  const id = useParams()?.id
  const [restaurant, setRestaurant] = useState('No restaurant');
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState(0);
  const [owner, setOwner] = useState('No owner');
  const [cartData, setCartData] = useState([]);

  const setDisplayDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setDate(formattedDate);
  }

  const setTotalPrice = (cartData) => {
    const totalPrice = cartData.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotal(totalPrice);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ordersService.getOne(id);
        const cartData = response.mappedCart;

        //TODO: Find a better way to do this
        setCartData(cartData);
        setTotalPrice(cartData);
        setDisplayDate(response._createdOn);
        setOwner(response._ownerId);
       
        const restaurantRepsonse = await restaurantService.getByOwner(response.pickedRestaurant);
        setRestaurant(restaurantRepsonse.restaurantName);

      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    };

    fetchData()
      .then(() => console.log("Data fetched"));
  }, [id]);


  return (
    <section>
      {!state.isAuthenticated && (
        <Unauthorized />
      )}

      {state.isAuthenticated && state?.user._id === owner && (
        <div className="container aos-init aos-animate" data-aos="fade-up">
          <div className="section-title">
            <h2>Order Details</h2>
            <p>Restaurant: {restaurant}</p>
            <p>Total: $ {total}</p>
          </div>
          <h2>Date of order: {date}</h2>

          <div className={styles.menuItemContainer}>
            {cartData.map((cartDataItem, index) => (
              <OrderMealItem key={index} cartData={cartDataItem} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import * as restaurantService from '../../services/restaurantService';
import styles from '../Site.module.css';
import Unauthorized from '../Unauthorized/Unauthorized';


function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();
    const { state } = useAuth();

    useEffect(() => {
        restaurantService.getAll()
            .then(res => setRestaurants(res))
            .catch(err => console.log(`error in categories - ${err.message}`));
    }, []);

    const onPickRestaurant = async (restaurant) => {
        localStorage.setItem('pickedRestaurant', restaurant);
        navigate('/menu');
    }

    return (
        <section>
              {!state.isAuthenticated && (
                    <Unauthorized />
                )}

                {state.isAuthenticated && state.user?.role ==='Client' && (
                        <div className="container">
                        <ListGroup className="d-flex justify-content-between" data-bs-theme="dark">
                            {restaurants.map((restaurant, index) => (
                                <ListGroup.Item key={index} className="d-flex justify-content-between">{restaurant?.restaurantName}
                                    <div className="d-flex justify-content-between">
                                        <button onClick={() => onPickRestaurant(restaurant._ownerId)} className={styles.secondaryButton}>Pick</button>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                )}
           
        </section>
    );
}

export default RestaurantList;
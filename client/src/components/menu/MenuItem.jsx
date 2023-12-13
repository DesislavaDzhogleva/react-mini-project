/**
 * MenuItem Component Documentation
 * 
 * Overview:
 * The `MenuItem` component is a React functional component responsible for rendering an individual menu item. It utilizes React Router for navigation and authentication using the `useAuth` hook.

 * Dependencies:
 * - React: Used for building the user interface.
 * - React Bootstrap: Provides UI components for the application.
 * - `categoriesService` module: Provides methods for interacting with categories.
 * - `mealService` module: Provides methods for interacting with the menu items.

 * Props:
 * - item: Object representing the menu item to be rendered.
 * - onMealDelete: Function to handle the deletion of the menu item.

 * Rendering:
 * The component renders a card containing details of the menu item, including the meal image, name, description, category, and price. It also includes conditional rendering based on the user's role.

 * Styling:
 * The component uses CSS modules for styling, including `Menu.module.css`.

 * Child Components:
 * None

 * Navigation:
 * The component uses React Router for navigation, including links for editing the menu item.

 * State Management:
 * The component uses the `useState` hook to manage the category name and the `useAuth` hook for managing authentication state.

 * Error Handling:
 * Errors from fetching categories are caught and logged to the console.

 * Additional Notes:
 * - The component assumes that the user's role is stored in the `state` object.
 */


import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/esm/Button';
import * as categoriesService from '../../services/categoriesService';
import * as mealService from '../../services/mealService';
import styles from './Menu.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function MenuItem({ item, onMealDelete }) {
    const [categoryName, setCategoryName] = useState('');
    const { state } = useAuth();

    useEffect(() => {
        categoriesService.getOne(item.categoryId)
            .then(res => setCategoryName(res.categoryName))
            .catch(err => console.log(`error in categories - ${err.message}`));
    }, [item.categoryId]);



    return (
        <>
            <div className={styles.menuItemContainer}>
                <Card className={styles.menuItemCard} style={{ width: '18rem' }}>
                    <Card.Img className={styles.cardImageTop} variant="top" src={item.mealImage} />
                    <Card.Body>
                        <Card.Title>{item.mealName}</Card.Title>
                        <Card.Text>{item.mealDescription}</Card.Text>
                    </Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item className={styles.listItem}>{categoryName}</ListGroup.Item>
                    </ListGroup>
                    {state?.user.role === 'Restaurant' && (
                        <>
                            <Card.Body>
                                <Card.Link as={Link} to={`editMeal/${item?._id}`}>
                                    <button className={styles.button}>Edit</button>
                                </Card.Link>
                                <button onClick={() => onMealDelete(item._id)} className={styles.button}>Delete</button>
                            </Card.Body>

                            <Button className={styles.disabledButton}>Price - {item.mealPrice} lv.</Button>
                         </>

                    )}
                    {state?.user.role === 'Client' && (
                        <>
                            <Button variant="primary">Add to Cart - {item.mealPrice} lv.</Button>
                         </>

                    )}
                </Card>
            </div>
        </>
    );
}

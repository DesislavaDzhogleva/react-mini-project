/**
 * MenuList Component Documentation
 * 
 * Overview:
 * The `MenuList` component is a React functional component that is responsible for rendering a list of menu items. It utilizes React Router for navigation and authentication using the `useAuth` hook.
 * 
 * Dependencies:
 * - React: Used for building the user interface.
 * - React Router: Used for declarative routing in the application.
 * - `useAuth` hook: Used for managing authentication state.
 * - `mealService` module: Provides methods for interacting with the menu items.
 * 
 * Usage:
 * The `MenuList` component should be imported and rendered within the application where a list of menu items needs to be displayed.
 * 
 * Props:
 * The `MenuList` component does not accept any props.
 * 
 * Functions:
 * - `updateMeals`: Updates a specific menu item in the list.
 * - `addMeals`: Adds a new menu item to the list.
 * - `onMealDelete`: Handles the deletion of a menu item.
 * 
 * Rendering:
 * The component renders a section containing the list of menu items, along with conditional rendering based on the user's authentication status and role. It also includes routes for creating and editing menu items.
 * 
 * Styling:
 * The component uses CSS modules for styling, including `Site.module.css` and `Menu.module.css`.
 * 
 * Child Components:
 * - `Unauthorized`: Rendered when the user is not authenticated.
 * - `CreateMenuItem`: Used for creating a new menu item.
 * - `EditMenuItem`: Used for editing an existing menu item.
 * - `MenuItem`: Renders individual menu items within the list.
 * 
 * Navigation:
 * The component uses React Router for navigation, including links for creating and editing menu items.
 * 
 * State Management:
 * The component uses the `useState` hook to manage the list of menu items and the `useAuth` hook for managing authentication state.
 * 
 * Error Handling:
 * Errors from fetching menu items are caught and logged to the console.
 * 
 * Additional Notes:
 * - The component assumes that the user's role is stored in the `state` object.
 * - Confirmation dialog is displayed when deleting a menu item.
 */


import { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import * as menuService from '../../services/mealService';
import commonStyles from '../Site.module.css';
import Unauthorized from '../Unauthorized/Unauthorized';
import CreateMenuItem from './CreateMenuItem';
import EditMenuItem from './EditMenuItem';
import styles from './Menu.module.css';
import MenuItem from './MenuItem';

function MenuList() {
    const [menuItems, setMenuItems] = useState([]);
    const [restaurant, setRestaurant] = useState({});
    const { state } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const pickedRestaurant = localStorage.getItem('pickedRestaurant');
        if (!pickedRestaurant) {
            navigate('/restaurants');
        } else {
            setRestaurant(pickedRestaurant);
        }
    }, [state?.user?._id]);
    
    const updateMeals = (meal) => {
        setMenuItems(oldMenuItems => {
            const newMenuItems = oldMenuItems
                .map(x => x._id === meal._id ? meal : x)
            return newMenuItems;
        });
    };

    const addMeals = (meal) => {
        setMenuItems([...menuItems, meal]);
    }

    useEffect(() => {
        menuService.getAll(restaurant)
            .then(res => setMenuItems(res))
            .catch(err => console.log(`error in categories - ${err.message}`));
    }, [restaurant]);

    const onMealDelete = async (id) => {
        const hasConfirmed = window.confirm('Are you sure?');

        if (hasConfirmed) {
            await menuService.remove(id);

            setMenuItems(oldMeals => {
                const newMeals = oldMeals.filter(x => x._id !== id)
                return newMeals;
            });

            navigate('/menu');
        }
    }

    return (
        <>
            <section>
                {!state.isAuthenticated && (
                     <Unauthorized />
                )}

                {state.isAuthenticated && (
                    <>
                        <div className={styles.menuItemContainer}>
                            {menuItems.map((item, index) => (
                                <MenuItem key={index} item={item} onMealDelete={onMealDelete} />
                            ))}
                        </div>
                        {state?.user.role === 'Restaurant' && (
                            <div className={commonStyles.centeredContainer}>
                                <Link to="createMeal" className={commonStyles.primaryButton}>Create Meal</Link>
                            </div>
                        )}
                         <Routes>
                            <Route path='createMeal' element={<CreateMenuItem addMeals={addMeals} />} />
                            <Route path='editMeal/:id' element={<EditMenuItem updateMeals={updateMeals} />} />
                        </Routes>
                    </>
                )}
            </section>


        </>
    );
}

export default MenuList;
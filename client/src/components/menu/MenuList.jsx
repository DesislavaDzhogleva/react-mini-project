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
    const { state } = useAuth();
    const navigate = useNavigate();

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
        menuService.getAll(state?.user?._id)
            .then(res => setMenuItems(res))
            .catch(err => console.log(`error in categories - ${err.message}`));
    }, [state?.user?._id]);

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
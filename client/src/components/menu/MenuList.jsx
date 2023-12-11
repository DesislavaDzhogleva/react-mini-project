// import styles from './Menu.module.css';
import { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import * as mealService from '../../services/mealService';
import * as menuService from '../../services/mealService';
import commonStyles from '../Site.module.css';
import CreateMenuItem from './CreateMenuItem';
import EditMenuItem from './EditMenuItem';
import styles from './Menu.module.css';
import MenuItem from './MenuItem';
import Unauthorized from '../Unauthorized/Unauthorized';

function MenuList() {
    const [menuItems, setMenuItems] = useState([]);
    const { state } = useAuth();

    const navigate = useNavigate();
    const onCreateMenuItem = async (menuItem) => {
        const response = await mealService.create(menuItem);
        setMenuItems([...menuItems, response]);
        navigate('/menu');
    }

    const onEditMenuItem = async (e) => {
        e?.preventDefault();

        const editValues = Object.fromEntries(new FormData(e.currentTarget));
        const response = await mealService.edit(editValues);

        setMenuItems(oldMenuItems => {
            const newMenuItems = oldMenuItems
                .map(x => x._id === response._id ? response : x)
            return newMenuItems;
        });

        navigate('/menu');
    };

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
                        <Routes>
                            <Route path='createMeal' element={<CreateMenuItem onCreateMenuItem={onCreateMenuItem} />} />
                            <Route path='editMeal/:id' element={<EditMenuItem onEditMenuItem={onEditMenuItem} />} />
                        </Routes>

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
                    </>
                )}
            </section>


        </>
    );
}

export default MenuList;
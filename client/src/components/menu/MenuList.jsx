import { useEffect, useReducer, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import mealReducer from '../../reducers/mealReducer';
import * as mealService from '../../services/mealService';
import * as menuService from '../../services/mealService';
import { ValidationErrors, ValidationRegexes } from '../../constants/commonConstants';
import commonStyles from '../Site.module.css';
import Unauthorized from '../Unauthorized/Unauthorized';
import CreateMenuItem from './CreateMenuItem';
import EditMenuItem from './EditMenuItem';
import styles from './Menu.module.css';
import MenuItem from './MenuItem';

// const ValidationErrors = {
//     emptyInput: "This field cannot be empty",
//     inputNotNumber: "This field accepts only valid numbers"
// }

// const ValidationRegexes = {
//     //Validates that the price is a positive double or decimal number
//     priceRegex: new RegExp(/^(\d+(\.\d*)?|\.\d+)$/),
// }

function MenuList() {
    const [menuItems, setMenuItems] = useState([]);
    const { state } = useAuth();
    const navigate = useNavigate();
    //TODO: How to not do this in this component?
    const [menuItem, dispatch] = useReducer(mealReducer, {
        mealImageError: "",
        mealNameError: "",
        mealDescriptionError: "",
        mealPriceError: "",
        categoryIdError: "",
    })

    const onCreateMenuItem = async (menuItem) => {
        let isValid = true;
        Object.keys(menuItem).forEach((field) => {
            if (field === 'mealPrice') {
                if (validateNumberFields(field, menuItem[field]) === false) {
                    isValid = false;
                }
            }
            else {
                if (validateTextFields(field, menuItem[field]) === false) {
                    isValid = false;
                }
            }
        });

        if (isValid) {
            const response = await mealService.create(menuItem);
            setMenuItems([...menuItems, response]);
            navigate('/menu');
        }
    }

    const validateTextFields = (target, value) => {
        if (value.trim() === "") {
            dispatch({ type: `SET_${target.toUpperCase()}_ERROR`, payload: ValidationErrors.emptyInput });
            return false;
        }

        dispatch({ type: `SET_${target.toUpperCase()}_ERROR`, payload: null });
        return true;
    }

    const validateNumberFields = (target, value) => {
        if (target === "mealPrice") {
            if (!ValidationRegexes.priceRegex.test(value) || value.trim() === "") {
                console.log('not valid price');
                console.log(value);
                dispatch({ type: `SET_${target.toUpperCase()}_ERROR`, payload: ValidationErrors.inputNotNumber });
                return false;
            }

            dispatch({ type: `SET_${target.toUpperCase()}_ERROR`, payload: null });
            return true;
        }
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
                            <Route path='createMeal' element={<CreateMenuItem onCreateMenuItem={onCreateMenuItem} menuItem={menuItem} />} />
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
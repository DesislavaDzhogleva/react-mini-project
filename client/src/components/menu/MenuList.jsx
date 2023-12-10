import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './Menu.module.css';
import MenuItem from './MenuItem';
import * as categoriesService from '../../services/categoriesService';
import * as menuService from '../../services/mealService';
import CreateMenuItem from './CreateMenuItem';
import { useState } from 'react';
import * as mealService from '../../services/mealService';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';
import { useEffect } from 'react';

function MenuList() {
    const [menuItems, setMenuItems] = useState([]);
    const {state} = useAuth();

    const navigate = useNavigate();
    const onCreateMenuItem =  async (menuItem) => {
        const response = await mealService.create(menuItem);
        setMenuItems([...menuItems, response]);
        navigate('/');
    }

    useEffect(() => {
        menuService.getAll(state?.user?._id)
            .then(res => setMenuItems(res))
            .catch(err => console.log(`error in categories - ${err.message}`));
    }, [state?.user?._id]);

    const onMealDelete = async (id) => {
        const hasConfirmed = window.confirm('Are you sure?');

        if(hasConfirmed){
          await menuService.remove(id);
        
          setMenuItems(oldMeals => {
            const newMeals = oldMeals.filter(x => x._id !== id)
            return newMeals;
        });

          navigate('/');
        }
    }

    console.log(menuItems);

  return (
    <>
      <div className={styles.menuItemContainer}>
                {menuItems.map((item, index) => (
                    <MenuItem key={index} item={item}  onMealDelete={onMealDelete} /> 
                ))}
            </div>
        <CreateMenuItem onCreateMenuItem={onCreateMenuItem} />
        </>

  );
}

export default MenuList;
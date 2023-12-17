
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/esm/Button';
import styles from '../menu/Menu.module.css';
import * as mealsService from '../../services/mealService';
import { useEffect, useState } from 'react';


export default function OrderMealItem({cartData}) {
    const [meal, setMeal] = useState({});
   
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await mealsService.getOne(cartData.mealId);
              setMeal(response);
            } catch (error) {
              console.log(`Error in meal Item component: ${error.message}`);
            }
          };
        
          fetchData();
    }, [cartData.mealId]);

   
  return (
        <Card className={styles.menuItemCard} style={{ width: '18rem' }}>
            <Card.Img className={styles.cardImageTop} variant="top" src={meal.mealImage} />
            <Card.Body>
                <Card.Title>{meal.mealName}</Card.Title>
                <Card.Text>{meal.mealDescription}</Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroup.Item className={styles.listItem}>Single Price: $ {cartData.price}</ListGroup.Item>
                <ListGroup.Item className={styles.listItem}>Quantity: {cartData.quantity}</ListGroup.Item>
            </ListGroup>
            <Button disabled>Total Price: $ {cartData.totalPrice} lv.</Button>
        </Card>
  )
}
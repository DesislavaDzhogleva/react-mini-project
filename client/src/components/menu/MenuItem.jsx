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

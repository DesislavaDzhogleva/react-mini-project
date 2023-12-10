import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/esm/Button';
import * as categoriesService from '../../services/categoriesService';
import * as mealService from '../../services/mealService';
import styles from './Menu.module.css';

export default function MenuItem({ item, onMealDelete}) {
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        categoriesService.getOne(item.categoryId)
            .then(res => setCategoryName(res.categoryName))
            .catch(err => console.log(`error in categories - ${err.message}`));
    }, [item.categoryId]);

    

    return (
        <>
            <div className={styles.menuItemContainer}>
                <Card className={styles.menuItemCard} style={{ width: '18rem' }}>
                    <Card.Img  className={styles.cardImageTop} variant="top" src={item.mealImage} />
                    <Card.Body>
                        <Card.Title>{item.mealName}</Card.Title>
                        <Card.Text>{item.mealDescription}</Card.Text>
                    </Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item className={styles.listItem}>{categoryName}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Edit</Card.Link>
                        <button onClick={() => onMealDelete(item._id)} className={styles.button}>Delete</button>
                        <button className={styles.button}>Details</button>
                    </Card.Body>
                    <Button variant="primary">Add to cart - {item.mealPrice} lv.</Button>
                </Card>
            </div>
        </>
    );
}

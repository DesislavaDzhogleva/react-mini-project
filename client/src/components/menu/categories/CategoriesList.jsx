import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, Outlet } from 'react-router-dom';
import * as categoriesService from '../../../services/categoriesService';
import styles from './Categories.module.css';

function CategoriesList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoriesService.getAll()
            .then(res => setCategories(res))
            .catch(err => console.log(`error in categories - ${err.message}`));
        console.log('asd');
    }, []);


    return (
        <div className={styles.categoriesContainer}>
            <ListGroup className="d-flex justify-content-between" data-bs-theme="dark">
                <ListGroup.Item className="d-flex justify-content-between">Test Category
                    <div className="d-flex justify-content-between">
                        <button className={styles.secondaryButton}>Edit</button>
                        <button className={styles.secondaryButton}>Delete</button>
                    </div>
                </ListGroup.Item>
                {categories.map((category, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between">{category.categoryName}
                        <div className="d-flex justify-content-between">
                            <button className={styles.secondaryButton}>Edit</button>
                            <button className={styles.secondaryButton}>Delete</button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <div className={styles.centeredContainer}>
                <Link to="createCategory" className={styles.primaryButton}>Create Category</Link>
            </div>

            <Outlet />
        </div>
    );
}

export default CategoriesList;
import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { useForm } from '../../../hooks/useForms';
import * as categoriesService from '../../../services/categoriesService';
import styles from './Categories.module.css';
import CreateMenuCategory from './CreateCategory';

function CategoriesList() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

     const onCreateCategory = async (category) => {
        await categoriesService.create(category)
            .then(res => setCategories([...categories, res]));
        navigate('/categories');
    }

    const { values, onChange, onSubmit } = useForm({
        categoryName: "",
    }, onCreateCategory);
    

    useEffect(() => {
        categoriesService.getAll()
            .then(res => setCategories(res))
            .catch(err => console.log(`error in categories - ${err.message}`));
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

            <Routes>
                <Route path='createCategory' element={<CreateMenuCategory values={values} onChange={onChange} onSubmit={onSubmit} />} />
            </Routes>
        </div>
    );
}

export default CategoriesList;
import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { useForm } from '../../../hooks/useForms';
import * as categoriesService from '../../../services/categoriesService';
import styles from './Categories.module.css';
import CreateMenuCategory from './CreateCategory';
import EditMenuCategory from './EditCategory';
import { useAuth } from '../../../hooks/useAuth';
import Unauthorized from '../../Unauthorized/Unauthorized';


function CategoriesList() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const { state } = useAuth();

    useEffect(() => {
        categoriesService.getAll(state?.user?._id)
            .then(res => setCategories(res))
            .catch(err => console.log(`error in categories - ${err.message}`));
    }, []);

     const onCreateCategory =  async (category) => {
        const response = await categoriesService.create(category);
        setCategories([...categories, response]);
        navigate('/categories');
    }

    const onEditCategory = async (e) => {
        e?.preventDefault();

        const editValues = Object.fromEntries(new FormData(e.currentTarget));
        const response =  await categoriesService.edit(editValues);
       
        setCategories(oldCategories => {
            const newCategories = oldCategories
                .map(category => category._id === response._id ? response : category)
            return newCategories;
        });

        navigate('/categories');
    };

    const onDeleteCategory = async (id) => {
        const hasConfirmed = window.confirm('Are you sure?');

        if(hasConfirmed){
          await categoriesService.remove(id);
        
          setCategories(oldCategories => {
            const newCategories = oldCategories.filter(category => category._id !== id)
            return newCategories;
        });

          navigate('/categories');
        }
    }

    return (
        <section>
              {!state.isAuthenticated && (
                    <Unauthorized />
                )}

                {state.isAuthenticated && state.user?.role ==='Restaurant' && (
                        <div className="container">
                        <ListGroup className="d-flex justify-content-between" data-bs-theme="dark">
                            {categories.map((category, index) => (
                                <ListGroup.Item key={index} className="d-flex justify-content-between">{category?.categoryName}
                                    <div className="d-flex justify-content-between">
                                        <Link to={`editCategory/${category?._id}`} className={styles.secondaryButton}>
                                            Edit
                                        </Link>
                                        <button onClick={() => onDeleteCategory(category._id)} className={styles.secondaryButton}>Delete</button>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
        
                        <div className={styles.centeredContainer}>
                            <Link to="createCategory" className={styles.primaryButton}>Create Category</Link>
                        </div>
        
                        <Routes>
                            <Route path='createCategory' element={<CreateMenuCategory onCreateCategory={onCreateCategory} />} />
                            <Route path='editCategory/:id' element={<EditMenuCategory onEditCategory={onEditCategory} />} />
                        </Routes>
                    </div>
                )}
           
        </section>
    );
}

export default CategoriesList;
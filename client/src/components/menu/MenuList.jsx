import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './Menu.module.css';
import MenuItem from './MenuItem';

function MenuList() {
  return (
    <div className={styles.menuItemContainer}>
        <MenuItem />
    </div>
  );
}

export default MenuList;
import { useCartContext } from '../../contexts/cartContext';
import styles from './Cart.module.css';

const CartItem = ({ item }) => {
    const { removeFromCart, addOrEditCartItem, setQty} = useCartContext();
   
    const onProductIncreaseQuantity= async (e) => {
        e.preventDefault()
        try {
            addOrEditCartItem(item, 1);
        }
        catch (error) {
           console.log("Error on increase quantity - " + error.message);
        }
    }

    const onProductDecreaseQuantity= async (e) => {
        e.preventDefault()
        try {
            addOrEditCartItem(item, -1);
        }
        catch (error) {
           console.log("Error on decrease quantity - " + error.message);
        }
    }

    const onProductInputChange = async (e) => {
        e.preventDefault()
        try {
            setQty(item, parseInt(e.target.value, 10));
        }
        catch (error) {
          console.log("Error on input change - " + error.message);
        }
    }

    return ( 
    <tr className={styles.cartRow}>
        <td className="menu-ingredients">{item.mealName}</td>
        <td className="menu-ingredients"> $ ({item.mealPrice})</td>
        <td>
            <div className="input-group bg-transparent">
            <button
                className="minus-item input-group-addon btn btn-secondary"
                data-name={item.mealName} onClick={onProductDecreaseQuantity}>
               -
            </button>
            <input
                type="number"
                className="item-count form-control"
                data-name={item.mealName}
                value={item.quantity}
                onChange={onProductInputChange} />
            <button
                className="plus-item btn btn-secondary input-group-addon"
                data-name="Tuscan_Grilled" onClick={onProductIncreaseQuantity}>
                +
            </button>
            </div>
        </td>
        <td>
            <div
                className="px-2 delete-item cursor-pointer"
                role="button"
                data-name={item.mealName}>
                 <i className="gg-trash" onClick={() => removeFromCart(item._id)}></i>
            </div>
        </td>
        <td> $ {item.totalPrice}</td>
    </tr>
)}

export default CartItem;
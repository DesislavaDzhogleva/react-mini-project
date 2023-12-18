import styles from './Cart.module.css';
import { useCartContext } from '../../contexts/cartContext';
import * as orderService from '../../services/ordersService'
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
function Cart({closeModal}){
    const { cart, addToCart, removeFromCart, emptyCart } = useCartContext();
    const navigate = useNavigate();
    const totalPrice = cart.reduce((acc, item) => {
        return acc + (item.mealPrice * item.quantity)
      }, 0);

      const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const pickedRestaurant = localStorage.getItem('pickedRestaurant');
            if(!pickedRestaurant){
                navigate('/restaurants');
            }
            
            const mappedCart = cart.map(item => ({
                mealName: item.mealName,
                quantity: item.quantity,
                price: parseFloat(item.mealPrice), // Assuming mealPrice is a string, convert it to a number if needed
                totalPrice: parseFloat(item.totalPrice), // Same assumption as above
                mealId: item.mealId,
                pickedRestaurant: pickedRestaurant
              }));

              const cartWithPickedRestaurant = {
                pickedRestaurant,
                mappedCart,
              };
              

            var response = await orderService.create(cartWithPickedRestaurant);
            //TODO: How to do this actyally?
            emptyCart();
            closeModal();
            navigate('/orderDetails/' + response._id);

        }
        catch (error) {
            console.log("Error on submit - " + error.message);
        }
      }

    return (
        <div className={styles.cartModal}
             id="cart"
             tabIndex={-1}
             role="dialog"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-lg bg-secondary" role="document">
                <div className="modal-content bg-dark p-4">
                <div className="modal-header">
                    <div className="section-title">
                    <h2>Order now</h2>
                    <p>Shopping Cart</p>
                    </div>
                </div>
                <div className="modal-body">
                    <div className="order-success d-none alert alert-primary" role="alert">
                        You have ordered successfully
                    </div>
                    <div className="order-error d-none alert alert-danger" role="alert">
                        There was a problem during your order
                    </div>
                    <ul>
                   
                </ul>
                    <table className="menu menu-content show-cart table text-white table-dark">
                    <tbody>
                        {cart.map(item => (
                            <CartItem key={item._id} item={item} />
                        ))}
                    </tbody>
                    </table>
                    <div className="menu menu-content">

                <div className="menu-ingredients m-0">Total price: $
                    <span className="total-cart">{totalPrice}</span></div>
                </div>
                </div>
                <div className="modal-footer">
                    <a className="book-a-table-btn d-none d-lg-flex"
                    role="button"
                    data-dismiss="modal"
                    onClick={closeModal}>
                        Close
                    </a>
                    <button type="button" onClick={onSubmit} className="order-now cart-btn d-lg-flex">
                        Order Now
                    </button>
                </div>
                </div>
            </div>
            </div>

    )
}

export default Cart;
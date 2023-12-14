import styles from './Cart.module.css';
import { useCartContext } from '../../contexts/cartContext';
import CartItem from './CartItem';
function Cart({closeModal}){
    const { cart, addToCart, removeFromCart } = useCartContext();

    const totalPrice = cart.reduce((acc, item) => {
        return acc + (item.mealPrice * item.quantity)
      }, 0);

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
                    <button type="button" className="order-now cart-btn d-lg-flex">
                        Order Now
                    </button>
                </div>
                </div>
            </div>
            </div>

    )
}

export default Cart;
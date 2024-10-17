import { useContext } from "react"
import Button from './UI/Button';
import CartContext from "./store/CartContext";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "./store/UserProgressContext.jsx";
import Modal from "./UI/Modal.jsx";
import CartItem from "./CartItem";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal  = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price , 0);

    function handleRemoveCart() {
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckout();
    }
    return (
        <Modal open={userProgressCtx.progress === 'cart'} 
        onClose={userProgressCtx.progress === 'cart' ? handleRemoveCart : null}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem 
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    onIncrease={() => cartCtx.addItem(item)}
                    onDecrease={() => cartCtx.removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleRemoveCart}>Close</Button>
                {cartCtx.items.length > 0 ? (
                    <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
                ) : null} 
            </p>
        </Modal>
    )
}
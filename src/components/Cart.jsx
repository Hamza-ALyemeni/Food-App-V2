import { useContext } from "react"
import Button from './UI/Button';
import CartContext from "./store/CartContext";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "./store/UserProgressContext.jsx";
import Modal from "./UI/Modal.jsx";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal  = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price , 0);

    function handleRemoveCart() {
        userProgressCtx.hideCart();
    }
    return (
        <Modal open={userProgressCtx.progress === 'cart'}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.quantity}
                    </li>
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleRemoveCart}>Close</Button>
                <Button onClick={handleRemoveCart}>Go to Checkout</Button>
            </p>
        </Modal>
    )
}
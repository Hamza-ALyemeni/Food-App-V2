import { useContext } from 'react';
import imgLogo from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from './store/CartContext.jsx';
import UserProgressContext from './store/UserProgressContext.jsx';

export default function Header(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    function handleCartOpen() {
        userProgressCtx.showCart();
    }


    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    },0);

    return (
        <header id="main-header">
            <div id="title">
                <img src={imgLogo} alt="A Restuarent" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleCartOpen}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
} 
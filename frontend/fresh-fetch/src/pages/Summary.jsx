import Header from "../components/Header";
import "../styles/Summary.css";
import { useLocation, useNavigate } from 'react-router-dom';

import arrowImg from "../images/arrow.png";

export default function Summary() {
    // This component will be handling the order summary.
    // Once an order(orders) has been made, this is the page the user will see.

    const location = useLocation();
    const state = location.state;
    const orders = state.orders;
    console.log(orders);

    // Gets user from Produce/Basket page
    const user = state.user;

    // Calculate the sum of everything in the orders array
    const subTotal = orders.reduce((acc, current) => {
        return acc + Number(current.price) * current.quantity;
    }, 0);

    const delivery = 3.99;
    const tax = 2.00;

    // Amount user owes(tax and delivery included)
    const total = subTotal + delivery + tax;

    // If order came from the produce page, add it to basket
    for (const order of orders) {
        if(!user.basket.includes(order)) {
            user.basket.push(order);
        }
    }

    const navigate = useNavigate();
    function goBackToBasket() {
        // update the basket
        const newUser = {
            ...user,
            basket: user.basket.map(order => {
                // if order in basket is also in the orders array sent separately,
                // change the status to "Pending" and update the price and the paidStatus
                if (orders.includes(order)) {
                    const price = order.pricePerPound * order.quantity;
                    return { ...order, status: "Pending", paidStatus: true, price: price }
                // If not just return the order
                } else {
                    return order
                }
            })
        }
        // Go back to Basket with the updated user
        navigate('/basket', { state: { user: newUser }});
    }

    return (
        <>
            <div className="header-container">
                <Header user={user}/>
            </div>

            <main className="summary">
                {/* Contains information about the order cost */}
                <h2>Order summary</h2>
                <div className="summary-grid">
                    <p>Subtotal</p>   <p>${subTotal.toFixed(2)}</p>
                    <p>Delivery</p>   <p>${delivery.toFixed(2)}</p>
                    <p>Tax</p>        <p>${tax.toFixed(2)}</p>
                    <p className="bold">Total</p>      <p className="bold">${total.toFixed(2)}</p>

                </div>

                <div className="pay-btn">
                    {/* For now, payment is not integrated so it just goes back to
                        the basket page */}
                <button onClick={goBackToBasket}>Continue to payment
                    <img src={arrowImg} alt="An arrow" />
                </button>
                </div>
            </main>
        </>
    )
}
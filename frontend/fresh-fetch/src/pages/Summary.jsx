import Header from "../components/Header";
import "../styles/Summary.css";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import arrowImg from "../images/arrow.png";

export default function Summary() {
    // This component will be handling the order summary.
    // Once an order(orders) has been made, this is the page the user will see.

    const location = useLocation();
    const state = location.state;
    const orders = state.orders;
    console.log("Order at basket:", orders)
    const user = state.user;

    const subTotal = orders.reduce((acc, current) => {
        return acc + current.pricePerPound * current.quantity;
    }, 0);

    const delivery = 3.99;
    const tax = 2.00;
    const total = subTotal + delivery + tax;

    for (const order of orders) {
        if(!user.basket.includes(order)) {
            user.basket.push(order);
        }
    }

    const navigate = useNavigate();
    function goBackToBasket() {
        const newUser = {
            ...user,
            basket: user.basket.map(order => {
                if (orders.includes(order)) {
                    return { ...order, status: "Pending", paidStatus: true }
                } else {
                    return order
                }
            })
        }
        console.log("New basket:", user.basket);
        navigate('/basket', { state: { user: newUser }});
    }

    return (
        <>
            <div className="header-container">
                <Header />
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
                <button onClick={goBackToBasket}>Continue to payment
                    <img src={arrowImg} alt="An arrow" />
                </button>
                </div>
            </main>
        </>
    )
}
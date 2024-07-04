import { useLocation, useNavigate } from 'react-router-dom';
import { MdHome } from 'react-icons/md';

import Header from "../components/Header";

import "../styles/Summary.css";

import arrowImg from "../images/arrow.png";

export default function Summary() {
    // This component will be handling the order summary.
    // Once an order(orders) has been made, this is the page the user will see.

    const location = useLocation();
    const state = location.state;
    const orders = state.orders;
    const token = localStorage.getItem('token');
    const apiURL = process.env.REACT_APP_API_URL;
    // console.log("Orders at summary:", orders);

    // Gets user from Produce/Basket page
    const user = state.user;

    // Calculate the sum of everything in the orders array
    const subTotal = orders.reduce((acc, current) => {
        return acc + Number(current.product_price) * Number(current.quantity);
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
    async function goBackToBasket() {
        orders.forEach(async (order) => {
            const price = Number(order.product_price) * Number(order.quantity);
            try {
                const response = await fetch(`${apiURL}/api/v1/orders/${order.id}/`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body : JSON.stringify({
                        price: price,
                        paid_status: true,
                        quantity: order.quantity
                     }),
                })
    
                if (response.ok) {
                    console.log("Order updated successfullly");
                } else {
                    console.log("I am not okay", await response.json())
                }
            } catch(error) {
                console.log("Error updating order", error)
            }
        })


        navigate('/basket', { state: { user: user }});

        navigate('/basket', { state: { user: user }});
        // Go back to Basket with the updated user

    }

    const goHome = () => {
        navigate('/', { state: { user: user }})
    }

    return (
        <>
            <div className="header-container">
                <Header user={user}/>
                <MdHome className='home-icon' onClick={goHome}/>
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

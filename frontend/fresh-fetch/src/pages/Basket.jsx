import { useState } from "react";

import Header from "../components/Header";
import basketImg from "../images/basket.jpg";
import Order from "../components/Order";
import PendingOrder from "../components/PendingOrder";
import Profile from "../components/Profile";

import "../styles/Basket.css";

import profilePic from "../images/pic-person-01.jpg";
import tomatoImg from "../images/tomato.jpg";
import gingerImg from "../images/ginger.jpg";
import onionImg from "../images/onion.jpg";


export default function Basket() {
    // This is a component that will display the basket page

    const statuses = {
        completed: "Completed",
        pending: "Pending",
        cancelled: "cancelled",
    }

    // User state is empty to represent users that are not logged in
    const [ user, setUser ] = useState({
        userId: "1",
        firstName: "Benoni",
        lastName: "Esckinder",
        basket: [
            {
                id: "1",
                productId: "1",
                name: "Heirloom tomato",
                pricePerPound: "$5.99 / lb",
                vendor: "Wall-Mart",
                quantity: 1,
                price: "$5.99",
                status: null,
                pic: tomatoImg,
            },
            {
                id: "2",
                productId: "2",
                name: "Organic ginger",
                pricePerPound: "$12.99 / lb",
                vendor: "Wall-Mart",
                quantity: 1,
                price: "$6.50",
                status: null,
                pic: gingerImg,
            },
            {
                id: "3",
                productId: "3",
                name: "Sweet onion",
                pricePerPound: "$14.95 / lb",
                vendor: "Fresh Corner",
                quantity: 1,
                price: "$14.95",
                status: statuses.pending,
                pic: onionImg,
            },

            {
                id: "4",
                productId: "3",
                name: "Sweet onion",
                pricePerPound: "$14.95 / lb",
                vendor: "Fresh Corner",
                quantity: 1,
                price: "$14.95",
                status: statuses.pending,
                pic: onionImg,
            },
            {
                id: "5",
                productId: "3",
                name: "Sweet onion",
                pricePerPound: "$14.95 / lb",
                vendor: "Fresh Corner",
                quantity: 1,
                price: "$14.95",
                status: statuses.completed,
                pic: onionImg,
            }
        ],
        profilePic: profilePic,
    });

    function handleChangeQuantity(e, id) {
        const value = e.target.value;
        const newBasket = user.basket.map((item) => {
            if(item.id === id) {
                return { ...item, quantity: value };
            } else {
            return item;
            }
        })
        setUser((prevState) => ({
            ...prevState,
            basket: newBasket,
        }));
    }


    function removeOrder(id) {
        const newBasket = user.basket.filter(order => order.id !== id);
        setUser((prevState) => ({
            ...prevState,
            basket: newBasket,
        }));
    }

    // console.log(user.basket);

    function cancelAllPending() {
        setUser((prevState) => ({
            ...prevState,
            basket: user.basket.filter(order => order.status == null)
        }));
    }
    return (
        <>
            <div className="header-container">
                <Header />
            </div>

            <div className="profile-container" aria-label="User Profile">
                <Profile profilePic={user.profilePic} />
                <div className="user-info">
                    <h2 className="user-header">{user.firstName}'s Basket</h2>
                </div>
            </div>

            <main>
                {/* This div contains the basket logo,
                    the orders count and the order-all button */}
                <div className="basket-header">
                    <div className="basket-logo">
                        <img src={basketImg} alt="A basket" />
                        <div className="basket-logo-text">
                            <h2>Basket</h2>
                            <small className="item-count" aria-label="Item count">{user.basket.filter(order => !order.status).length} item(s)</small>
                        </div>
                    </div>

                    <button className="order-all-btn">Order all</button>
                </div>
                <hr />

                {/* This div is for orders that haven't been made yet */}
                <div className="pre-orders">
                    {user.basket.filter(order => !order.status).length === 0 ? (
                        <p className="basket-p">Looks like there is nothing in your basket.</p>
                    ) :
                        user.basket.filter(order => !order.status)
                            .map((order) => (
                                <Order key={order.id}
                                    order={order} 
                                    removeOrder={removeOrder}
                                    handleChange={handleChangeQuantity} />
                            ))
                        }
                    {/* {preOrders.map((order) => (
                        <Order key={order.id}
                               order={order} 
                               removeOrder={removeOrder} />
                    ))} */}
                </div>

                {/* This div contains the "pending" header and the cancel-all
                    button
                */}
                <div className="pending-header">
                    <div className="pending-header-text">
                        <h2>Pending</h2>
                        <small className="item-count">{user.basket.filter(order => order.status).length} item(s)</small>
                    </div>
                    <button className="cancel-all-btn"
                            onClick={cancelAllPending}>Cancel all</button>
                </div>
                <hr />

                {/* This div is for all the orders that have been made(sent out)
                    but still not delivered yet. */}

                <div className="pending-orders">
                    {user.basket.filter(order => order.status).length === 0 ? (
                        <p className="basket-p">You have no pending orders</p>
                    ) : 
                        user.basket.filter(order => order.status)
                            .map((order) => (
                                <PendingOrder key={order.id}
                                              order={order}
                                              cancelOrder={removeOrder} />
                            ))
                        }
                </div>
            </main>
            
        </>
    )
}
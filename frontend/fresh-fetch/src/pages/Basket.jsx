// imports from React
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

// Custom component imports
import Header from "../components/Header";
import basketImg from "../images/basket.jpg";
import Order from "../components/Order";
import PendingOrder from "../components/PendingOrder";
import Profile from "../components/Profile";

// Style imports
import "../styles/Basket.css";


export default function Basket() {
    // This is a component that will display the basket page

    const location = useLocation();
    const state = location.state;
    const token = localStorage.getItem('token');

    // Receive the user from the Produce/Summary page
    const [ user, setUser ] = useState(state.user);

    // Orders that have already been paid for
    const [ madeOrders, setMadeOrders ] = useState([]);

    // Orders that are jsut sitting there(haven't been sent out yet)
    const [ unmadeOrders, setUnmadeOrders ] = useState(user.basket);

    // Every time the basket changes, reset made and unmade orders
    useEffect(() => {
        const unmade = user.basket.filter(order => !order.paid_status);
        const made = user.basket.filter(order => order.status !== "completed" && order.paid_status);
  
        setUnmadeOrders(unmade);
        setMadeOrders(made);
    }, [user.basket]);

    useEffect(() => {
        getBasket()
    }, []);

    async function getBasket() {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/orders/', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                const orders = await response.json();

                setUser(prevUser => ({ ...prevUser, basket: orders}));
            }
        } catch(error) {
            console.error("Error getting basket:", error)
        }
    }

    async function handleChangeQuantity(e, id) {
        // Set the user with the new basket
        const value = e.target.value;
        const newBasket = user.basket.map((item) => {
            // If this is the item whose quantity is being changed...
            if(item.id === id) {
                // Return the item with the qunatity changed
                return { ...item, quantity: value };
            } else {
                // Else just return te item
            return item;
            }
        })

        setUser(prevUser => ({ ...prevUser, basket: newBasket }))
    }


    async function removeOrder(id) {
        // Remove the order from the basket completely
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/orders/${id}/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                })

                if (response.ok) {
                    if (response.status === 204) {
                        console.log("Order deleted successfullly");
                        getBasket();
                    }
                } else {
                    if (response.status === 400) {
                        console.log("Error deliting order");
                    } else {
                        console.log("I am not okay", await response.json());
                    }
                }
        } catch(error) {
            console.log("Network error", error)
        }
    }

    // Removes all of the orders that are pending
    function cancelAllPending() {
        for (const order of madeOrders) {
            removeOrder(order.id);
        }
    }

    // Changes the status of the order from pending to completed
    async function confirmOrder(order) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/orders/${order.id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    product_id: order.product_id,
                    order_status: "completed",
                 }),
            })

            if (response.ok) {
                console.log("Order confirmed");
                getBasket();
            } else {
                console.log("I am not okay", await response.json())
            }
        } catch(error) {
            console.log("Error updating order", error)
        }

        setTimeout(() => {
            removeOrder(order.id);
        }, 10000)
    };

    const navigate = useNavigate();

    // Handles an individual order being made
    async function handleOrderNow(order) {
        // Identify the order that is being made
        // console.log(order.quantity);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/orders/${order.id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    product_id: order.product_id,
                    quantity: order.quantity,
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
        const response = await fetch(`http://127.0.0.1:8000/api/v1/products/${order.product_id}`);
        const product = await response.json();

        // Go to the summary page with the user and the order
        navigate('/summary', { state: { user: user, orders: [order]}})
    }

    // Handles ordering everything in basket that is not already ordered
    async function handleOrderAll() {
        unmadeOrders.forEach(async order => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/orders/${order.id}/`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body : JSON.stringify({
                        product_id: order.product_id,
                        quantity: order.quantity,
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
        });
        // Go to the summary page with the user and the order
        console.log(unmadeOrders);
        navigate('/summary', { state: { user: user, orders: unmadeOrders}})
    }

    return (
        <>
            <div className="header-container">
                <Header user={user}/>
            </div>

            <div className="profile-container" aria-label="User Profile">
                <Profile profilePic={user.image} />
                <div className="user-info">
                    <h2 className="user-header">{user.first_name}'s Basket</h2>
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

                    <button className="order-all-btn"
                            onClick={handleOrderAll}
                            disabled={unmadeOrders.length <= 0}>Order all</button>
                </div>
                <hr />

                {/* This div is for orders that haven't been made yet */}
                <div className="pre-orders">
                    {unmadeOrders.length === 0 ? (
                        <p className="basket-p">Looks like there is nothing in your basket.</p>
                    ) :
                        unmadeOrders.map((order) => (
                                <Order key={order.id}
                                    order={order} 
                                    removeOrder={removeOrder}
                                    handleChange={handleChangeQuantity}
                                    handleOrder={handleOrderNow} />
                            ))
                        }
                </div>

                {/* This div contains the "pending" header and the cancel-all
                    button
                */}
                <div className="pending-header">
                    <div className="pending-header-text">
                        <h2>Pending</h2>
                        <small className="item-count">{madeOrders.length} item(s)</small>
                    </div>
                    <button className="cancel-all-btn"
                            onClick={cancelAllPending}
                            disabled={madeOrders.length <= 0}>Cancel all</button>
                </div>
                <hr />

                {/* This div is for all the orders that have been made(sent out)
                    but still not delivered to the user yet. */}

                <div className="pending-orders">
                    {/* If there are no pending orders display an informative paragraph */}
                    {madeOrders.length === 0 ? (
                        <p className="basket-p">You have no pending orders</p>
                    ) :
                    // Map through all the pending orders and pass them to the PendingOrders component                     
                        madeOrders.map((order) => (
                                <PendingOrder key={order.id}
                                              order={order}
                                              cancelOrder={removeOrder}
                                              confirmOrder={confirmOrder} />
                            ))
                        }
                </div>
            </main>
            
        </>
    )
}

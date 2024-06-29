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

    // Receive the user from the Produce/Summary page
    const [ user, setUser ] = useState(state.user);

    // Orders that have already been paid for
    const [ madeOrders, setMadeOrders ] = useState([]);

    // Orders that are jsut sitting there(haven't been sent out yet)
    const [ unmadeOrders, setUnmadeOrders ] = useState(user.basket);

    // Every time the basket changes, reset made and unmade orders
    useEffect(() => {
        const unmade = user.basket.filter(order => !order.pais_status);
        const made = user.basket.filter(order => order.paid_status);
  
        setUnmadeOrders(unmade);
        setMadeOrders(made);
    }, [user.basket]);

    function handleChangeQuantity(e, id) {
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

        // Set the user with the new basket
        setUser((prevState) => ({
            ...prevState,
            basket: newBasket,
        }));
    }


    function removeOrder(id) {
        // Remove the order from the basket completely
        const newBasket = user.basket.filter(order => order.id !== id);
        setUser((prevState) => ({...prevState, basket: newBasket}));
    }

    // Removes all of the orders that are pending
    function cancelAllPending() {
        setUser(prevUser => ({...prevUser, basket: unmadeOrders }));
    }

    // Changes the status of the order from pending to completed
    function confirmOrder(id) {
        const newMadeOrders = madeOrders.map((order => {
            if (order.id === id) {
                return {...order, status: "Completed"};
            } else {
                return order;
            }
        }))
        setMadeOrders(newMadeOrders);
    };

    const navigate = useNavigate();

    // Handles an individual order being made
    function handleOrderNow(id) {
        // Identify the order that is being made
        const order = user.basket.filter(order => order.id === id);

        // Go to the summary page with the user and the order
        navigate('/summary', { state: { user: user, orders: order}});
    }

    // Handles ordering everything in basket that is not already ordered
    function handleOrderAll(id) {
        navigate('/summary', { state: { user: user, orders: unmadeOrders } });
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
                    {user.basket.filter(order => !order.status).length === 0 ? (
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
                            >Cancel all</button>
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
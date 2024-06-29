// Imports from React
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

// Custom component imports
import Header from "../components/Header";
import VendorOrder from "../components/VendorOrder";
import VendorProducts from "../components/VendorProducts";
import CreateNewProduct from "../components/CreateNewProduct";
import Profile from "../components/Profile";
import Logout from "../components/Logout";

// Image imports (To be removed)
import profilePic from '../images/pic-person-01.jpg';
import tomatoImg from "../images/tomato.jpg";
import onionImg from "../images/onion.jpg";
import gingerImg from "../images/ginger.jpg";

// Style imports
import "../styles/Dashboard.css";

export default function Dashboard() {

    const location = useLocation();
    const state = location.state;
    const navigate = useNavigate();
    // console.log("User vendor:", state.user)
    // console.log("Token:", state.token)

    function goToLogin() {
        navigate('/login');
    }

    // Get user from login and save it in a user state
    const [ user, setUser ] = useState(state && {
        id: state.user?.id,
        first_name: state.user?.first_name,
        last_name: state.user?.last_name,
        // To be removed. This will be retireved from the api or from the user
        orders: [
            {
                id: "1",
                productId: "1",
                name: "Heirloom tomato",
                pricePerPound: "$5.99 / kg",
                vendor: "Wall-Mart",
                quantity: 5,
                price: "$5.99",
                status: "En-route",
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
                status: "Completed",
                pic: gingerImg,
            },
            {
                id: "3",
                productId: "3",
                name: "Sweet onion",
                pricePerPound: "$14.95 / lb",
                vendor: "Fresh Corner",
                quantity: .5,
                price: "$14.95",
                status: "Pending",
                pic: onionImg,
            }
        ],

        // Also to be removed. Will be replaced by data from teh API
        products: [],
    // } : {
    //     // Fake user(To be reomoved)
    //     userId: "",
    //     firstName: "",
    //     lastName: "",
    //     orders: [
    //         {
    //             id: "1",
    //             productId: "1",
    //             name: "Heirloom tomato",
    //             pricePerPound: "$5.99 / kg",
    //             vendor: "Wall-Mart",
    //             quantity: 5,
    //             price: "$5.99",
    //             status: "En-route",
    //             pic: tomatoImg,
    //         },
    //         {
    //             id: "2",
    //             productId: "2",
    //             name: "Organic ginger",
    //             pricePerPound: "$12.99 / lb",
    //             vendor: "Wall-Mart",
    //             quantity: 1,
    //             price: "$6.50",
    //             status: "Completed",
    //             pic: gingerImg,
    //         },
    //         {
    //             id: "3",
    //             productId: "3",
    //             name: "Sweet onion",
    //             pricePerPound: "$14.95 / lb",
    //             vendor: "Fresh Corner",
    //             quantity: .5,
    //             price: "$14.95",
    //             status: "Pending",
    //             pic: onionImg,
    //         }
    //     ],
    //     // Fake (To be replaced by API data)
    //     products: [
    //         {
    //             id: "1",
    //             name: "Heirloom Tomato",
    //             pricePerPound: 5.99,
    //             vendor: "Wall-Mart",
    //             quantity: 1,
    //             price: 0,
    //             // status: null,
    //             pic: tomatoImg,
    //         },
    //         {
    //             id: "2",
    //             name: "Organic Ginger",
    //             pricePerPound: 12.99,
    //             vendor: "Kmart",
    //             quantity: 1,
    //             price: 0,
    //             // status: null,
    //             pic: gingerImg,
    //         },
    //         {
    //             id: "3",
    //             name: "Sweet Onion",
    //             pricePerPound: 2.99,
    //             vendor: "target",
    //             quantity: 1,
    //             price: 0,
    //             // status: null,
    //             pic: onionImg,
    //         }
    //     ] 
    });


    const [ popupFormIsActive, setPopupFormIsActive ] = useState(false);
    function togglePopupForm() {
        setPopupFormIsActive(prevModal => !prevModal);
    }

    async function handleNewProduct(product) {
        const newProduct = {
            ...product,
            product_id: "4",
            description: "this is a descritpiton",
            product_status: "available",
            old_price: 0,
            user: user?.id,
        };
        console.log("new product:", JSON.stringify(newProduct));
        try {
            // Sends a request to the api to create a new product
            const response = await fetch('http://127.0.0.1:8000/api/v1/products/create/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${state.token.key}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                const product = await response.json();
                console.log('Created new product:', product);
                setUser(prevUser => ({
                    ...prevUser,
                    products: [...prevUser.products, product]
                }))

            } else {
                console.log(response, response.status);
                console.log(await response.json())
                console.log("I am not okay");
            }
        } catch(error) {
            console.log("Failed to submit form", error);
        } 
        
        togglePopupForm();
    }

    async function getProducts(id) {
        // Gets all products form the back-end
        const response = await fetch('http://127.0.0.1:8000/api/v1/products', {
            method: 'get',
        });

        if (response.ok) {
            const allProducts = await response.json();
            const products = allProducts.filter(product => product.user === id);
            // console.log('GET products:', products);
            setUser(prevUser => ({
                ...prevUser,
                products: [...products],
            }))
        } else {
            console.log("I am not okay");
        }
        return [];
    }

    useEffect(() => {
        getProducts(user.id)
    }, [user.basket])

    console.log("User's products:", user.products);

    async function handleRemoveProduct(id) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/products/${id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${state.token.key}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                console.log('Product deleted successfully');
                getProducts(user.id);
            } else {
                const errorData = await response.json();
                console.error('Errod delteing product:', errorData);
                return;
            }
        } catch(error) {
            console.error('Network error:', error);
        }
        // removeOrder()
    }


    // Change status from pending to en-route when fulfill is clicked
    function handleFulfill(id) {
        const newOrders = user.orders.map(order => {
            // If this is the order being fulfilled ...
            if (order.id === id) {
                // Return the order with the status set to En-route
                return {...order, status: "En-route"};
            } else {
                // Otherwise just return the order
                return order;
            }
        })

        // Set user with the updated orders array
        setUser(prevUser => ({ ...prevUser, orders: newOrders }));
    }

    function removeOrder(id) {
        const newProducts = user.products.filter((product) => product.id !== id)
        // Set user with new products array
        setUser(prevUser => ({ ...prevUser, products: newProducts }));
    }

    function changeQuantity(value, id) {
        const newProducts = user.products.map(product => {
            // If this is the product we are looking for...
            if (product.id === id) {
                // Return the product with the quantity changed
                return { ...product, quantity: value };
            } else {
                // Otherwise just return the product
                return product;
            }
        });
        // Set user with the new products array
        setUser(prevUser => ({ ...prevUser, products: newProducts }));
    }

    // Set the user to null and go back to the login page
    function handleLogout() {
        setUser(null);
        goToLogin()
    }

    return (
        <main>
            <div className="vendor-header">
                <Header isVendor={true} user={user}/>
            </div>

            {/* Display the profile only when user is received. */}
            {state !== null && (
                <div className="profile-container" aria-label="User Profile">
                <Profile profilePic={profilePic} />
                <div className="user-info">
                    <h2 className="user-header">{user.first_name}'s Dashboard</h2>
                    <Logout handleLogout={handleLogout}/>
                </div>
            </div>
            )}

            <h2 className="vendor-header">Orders</h2>
            <hr />

            {/* This div contains all the orders the vendor needs to handle,
                or has already handled */}
            <div className="all-orders">
                {user.orders.length === 0 ? (
                    <p className="basket-p">You have no active orders.</p>
                ) :
                    user.orders.map((order) => (
                        <VendorOrder key={order.id}
                                     order={order}
                                     handleFulfill={handleFulfill} />
                    ))
                }
            </div>
            
            <div className="my-products-container">
                <div className="products-header-container">
                <h2 className="products-header">My products</h2>

                    {/* Displays/Hides the popup form */}
                    <button className="new-btn"
                            onClick={togglePopupForm}
                        >{popupFormIsActive ? "Cancel" : "+ New"}</button>
                </div>
                <hr />

                {/* Display the popuoform if + New is pressed */}
                {popupFormIsActive && <CreateNewProduct createProduct={handleNewProduct}/>}

                {/* Displays all the products supplied by the user */}
                <div className="vendor-products">
                    {/* If the user has no products display an informative paragraph */}
                    {user.products.length === 0 ? (
                        <p className="no-products">You have no products. Create one!</p>
                    ) : user.products.map((product) => (
                        <VendorProducts key={product.product_id} product={product}
                                        changeQuantity={changeQuantity}
                                        removeProduct={handleRemoveProduct} />
                    ))}
                </div>
            </div>
        </main>
    )

}
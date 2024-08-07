// Imports from React
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router";

// Custom component imports
import Header from "../components/Header";
import VendorOrder from "../components/VendorOrder";
import VendorProducts from "../components/VendorProducts";
import CreateNewProduct from "../components/CreateNewProduct";
import Profile from "../components/Profile";
import Logout from "../components/Logout";

// Style imports
import "../styles/Dashboard.css";

export default function Dashboard() {

    const location = useLocation();
    const state = location.state;
    const token = localStorage.getItem('token')
    const apiURL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    function goToLogin() {
        navigate('/login');
    }

    useEffect(() => {
        (!state.user || !token) && goToLogin();
    })

    // Get user from login and save it in a user state
    const [ user, setUser ] = useState(state && token && {
        id: state.user?.id,
        first_name: state.user?.first_name,
        last_name: state.user?.last_name,
        image: state.user.image,
        orders: [],
        products: [],
    });

    const [ popupFormIsActive, setPopupFormIsActive ] = useState(false);
    function togglePopupForm() {
        setPopupFormIsActive(prevModal => !prevModal);
    }

    const getOrders = useCallback(async () => {
        try {
            const response = await fetch(`${apiURL}/api-auth/vendors/orders/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            })

            if (response.ok) {
                const orders = await response.json();
                // console.log("Pending ordres:", orders);
                setUser(prevUser => ({ ...prevUser, orders: orders}));
            }
        } catch(error) {
            console.error("Error getting basket:", error)
        }
    }, [apiURL, token])

    useEffect(() => {
        token && getProducts(user?.id);
        token && getOrders()
    }, [getOrders, token, user?.id]);

    async function handleNewProduct(product) {
        const newProduct = new FormData();
        newProduct.append('image', product.image);
        newProduct.append('name', product.name);
        newProduct.append('price', Number(product.price));
        newProduct.append('description', "this is a descritpiton")
        newProduct.append('product_status', "available");
        newProduct.append('old_price', Number(product.price));
        newProduct.append('user', user?.id);
        newProduct.append('stock_count', product.stock_count);
      
        JSON.stringify(newProduct);
    
        try {
            // Sends a request to the api to create a new product
            const response = await fetch(`${apiURL}/api/v1/products/create/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: newProduct,
            });
            if (response.ok) {
                const product = await response.json();
                setUser(prevUser => ({
                    ...prevUser,
                    products: [...prevUser.products, product]
                }))
            } else {

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
        const response = await fetch(`${apiURL}/api/v1/products`, {
            method: 'get',
        });

        if (response.ok) {
            const allProducts = await response.json();
            // console.log("Products: ", allProducts);
            const products = allProducts.filter(product => product.user === id);
            setUser(prevUser => ({
                ...prevUser,
                products: products,
            }))
        } else {
            console.log("I am not okay");
        }
        return [];
    }

    async function handleRemoveProduct(id) {
        try {
            const response = await fetch(`${apiURL}/api/v1/products/${id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                console.log('Product deleted successfully');
                getProducts(user.id);
            } else {
                const errorData = await response.json();
                console.error('Error delteing product:', errorData);
                return;
            }
        } catch(error) {
            console.error('Network error:', error);
        }
    }

    // console.log("User's products:", user.products);

    // Change status from pending to en-route when fulfill is clicked
    async function handleFulfill(order) {
        try {
            const response = await fetch(`${apiURL}/api-auth/vendors/orders/${order.id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_status: "enroute",
                }),
            })

            if (response.ok) {
                console.log('Product deleted successfully');
                getOrders();
            } else {
                const errorData = await response.json();
                console.error('Error fulfilling product:', errorData);
                return;
            }
        } catch(error) {
        console.error('Network error:', error);
        }
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
    async function handleLogout() {
        // Logs user out
        const response = await fetch(`${apiURL}/api-auth/users/logout/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
            }
        });

        if (response.ok) {
            location.state = null;
            localStorage.removeItem('token');
            setUser(null);
            goToLogin();
        } else {
            console.log("I am not okay", await response.json())
        }
    }

    return (
        <main>
            <div className="vendor-header">
                <Header isVendor={true} user={user}/>
            </div>

            {/* Display the profile only when user is received. */}
            {state && token && (
                <div className="profile-container" aria-label="User Profile">
                <Profile profilePic={user.image} />
                <div className="user-info">
                    <h2 className="user-header">{user.first_name}'s Dashboard</h2>
                    <Logout handleLogout={handleLogout}/>
                </div>
            </div>
            )}

            <h2 className="orders-header">Orders</h2>
            <hr />

            {/* This div contains all the orders the vendor needs to handle,
                or has already handled */}
            <div className="all-orders">
                {user && token && user.orders.length === 0 ? (
                    <p className="basket-p">You have no active orders.</p>
                ) :
                    token && user.orders.map((order) => (
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
                    {token && user.products.length === 0 ? (
                        <p className="no-products">You have no products. Create one!</p>
                    ) : token && user.products.map((product) => (
                        <VendorProducts key={product.id} product={product}
                                        changeQuantity={changeQuantity}
                                        removeProduct={handleRemoveProduct} />
                    ))}
                </div>
            </div>
        </main>
    )

}

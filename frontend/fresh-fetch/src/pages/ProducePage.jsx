// React related imports
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

// Components
import Header from "../components/Header";
import Produce from "../components/Produce";
import Search from "../components/Search";
import Profile from "../components/Profile";
import Logout from "../components/Logout";

// Styling
import "../styles/ProducePage.css";

// images
import basketImg from "../images/basket.jpg";
import profilePic from "../images/pic-person-01.jpg";

export default function ProducePage() {
    // This component displays all the available produces to the user
    
    const location = useLocation();
    const state = location.state;
    const token = localStorage.getItem('token');
    // console.log("state:", state)
    // console.log('Token:', token);


    // Recieves the user from the Login page at first.
    // Also recieves the user from the basket and the summary pages
    const [ user, setUser ] = useState(state ? {
        userId: state.user?.id,
        first_name: state.user?.first_name,
        last_name: state.user?.last_name,
        basket: state.user?.basket || [],
        image: profilePic,
    } : null);
    

    const [ displayProducts, setDisplayProducts ] = useState([]);
    //         id: products[0]?.id,
    //         name: products[0]?.title,
    //         pricePerPound: Number(products[0]?.price),
    //         vendor: products[0]?.description,
    //         quantity: 1,
    //         price: 0,
    //         status: null,
    //         pic: tomatoImg,
    //     },
    //     {
    //         id: "2",
    //         name: "Organic Ginger",
    //         pricePerPound: 12.99,
    //         vendor: "Kmart",
    //         quantity: 1,
    //         price: 0,
    //         status: null,
    //         pic: gingerImg,
    //     },
    //     {
    //         id: "3",
    //         name: "Sweet Onion",
    //         pricePerPound: 2.99,
    //         vendor: "target",
    //         quantity: 1,
    //         price: 0,
    //         status: null,
    //         pic: onionImg,
    //     }
    // ]: [
    //     // Fake products for dev. To be removed
    //     {
    //         id: "1",
    //         name: "Heirloom tomato",
    //         pricePerPound: 5.99,
    //         vendor: "Wall-mart",
    //         quantity: 1,
    //         price: 0,
    //         status: null,
    //         pic: tomatoImg,
    //     },
    //     {
    //         id: "2",
    //         name: "Organic Ginger",
    //         pricePerPound: 12.99,
    //         vendor: "Kmart",
    //         quantity: 1,
    //         price: 0,
    //         status: null,
    //         pic: gingerImg,
    //     },
    //     {
    //         id: "3",
    //         name: "Sweet Onion",
    //         pricePerPound: 2.99,
    //         vendor: "target",
    //         quantity: 1,
    //         price: 0,
    //         status: null,
    //         pic: onionImg,
    //     }
    // ]);

    const [searchResult, setSearchResult ] = useState([])

    async function getProducts() {
        // Gets all products form the back-end
        const response = await fetch('http://127.0.0.1:8000/api/v1/products', {
            method: 'get',
        });

        let products;
        if (response.ok) {
            products = await response.json();
            const responseVendor = await fetch('http://127.0.0.1:8000//api-auth/vendors/');

            // Get a list of all the vendors
            const vendors = await responseVendor.json();
            const newProducts = products.map(product => {

                // Find the creator of the product
                const vendor =  vendors.filter(vendor => vendor.id === product.user)[0]

                return {
                    ...product,
                    vendor: vendor.first_name + ' ' + vendor.last_name,
                    quantity: 1,
                    paid_status: false
                }
            })
            setDisplayProducts(prevState => [ ...newProducts, ]);
        } else {
            console.log("I am not okay");
        }
        return products;
    }

    useEffect(() => {
        getProducts();
        // getBasket();
    }, [])


    // console.log(user.userId)
    // async function getBasket() {
    //     try {
    //         const response = await fetch(`http://127.0.0.1/api-auth/users/user/`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         })

    //         if (response.ok) {
    //             const ordersJSON = await response.json();
    //             console.log("Pending ordres:", ordersJSON);
    //         }
    //     } catch(error) {
    //         console.error("Error getting basket:", error)
    //     }
    // }

    const navigate = useNavigate();

    // Pass user to basket
    const goToBasket = () => {
        navigate('/basket', { state: { user: user }});
    }

    // Limit the displayed products to the ones that are in the search
    function handleSearchReturn(name) {
        setSearchResult(displayProducts.filter(product => product.name === name))
    }

    const goToLogin = () => {
        navigate('/login');
    }

    const goToSignup = () => {
        navigate('/signup');
    }

    // Handles making order directly from the produce page instead of from the basket
    const handleMakeOrder = (id, quantity) => {
        const product = displayProducts.filter(product => product.id === id)
        const order = {
            ...product[0],
            quantity: quantity,
        }

        console.log("Order from homepage:", order);
        // If the user is logged in, go to the summary page
        user && token ? navigate('/summary', { state: { user: user, orders: [order]} })
            // if not go to the login page
             : goToLogin();
    }

    const addToBasket = (produce) => {
        // Set user with updated basket
        setUser((prevState) => ({
            ...prevState,
            basket: [
                ...prevState.basket,
                produce,
            ]
        }))
    };

    async function handleLogout() {
        // Logs user out
        const response = await fetch('http://127.0.0.1:8000/api-auth/users/logout/', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
            }
        });

        if (response.ok) {
            location.state = null;
            localStorage.removeItem('token');
            setUser(null);
        } else {
            console.log("I am not okay", await response.json())
        }
    };

    /* Depending on weather the user is logged in or not, this area will either
       display a login/signup button Or a basket button*/
    const conditionalComponent = user && token ? (
        <div className="basket-container">
            <button className="basket-btn" onClick={goToBasket}>
                <p>Basket({user.basket.length})</p>
                <img src={basketImg} alt="" />
            </button>
        </div> 
    ) : (
        <div className="user-auth-container">
            <button className="login-btn" onClick={goToLogin}>Login</button>
            <hr />
            <button className="signup-btn" onClick={goToSignup}>Signup</button>
        </div>
    );

    return (
        <>
            <div className="header-container">
                <Header user={user} />
                
            {conditionalComponent}

            </div>

            {/* Don't displaya user profile if user is not logged in */}
            {user && token && (
                <div className="profile-container" aria-label="User Profile">
                <Profile profilePic={user.image} />
                <div className="user-info">
                    <h2 className="user-header">Welcome {user?.first_name}</h2>
                    <Logout handleLogout={handleLogout}/>
                </div>
            </div>
            )}

            <main>
                {/* This div contains the produce header and the search,
                    button */}
                <div className="secondary-header">
                    <h2>Produce</h2>
                    <Search products={displayProducts} handleSearchReturn={handleSearchReturn}/>
                </div>
                <hr />
                

                {/* A few of the available produces */}
                <div className="produces">
                    {(searchResult.length !== 0 ? searchResult : displayProducts).map((product) => (
                        <Produce key={product.id} product={product}
                                 handleMakeOrder={handleMakeOrder}
                                 addToBasket={user && token ? addToBasket : goToLogin} />
                    ))}
                </div>
            </main>
        </>
    )
}
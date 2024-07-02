import "../styles/Order.css";
import { useState } from "react";

export default function Order({ order, removeOrder, handleChange, handleOrder }) {
    // This component is for the individual order items that will be displayed
    // in the basket. These orders haven't been made yet
    const [ error, setError ] = useState({});
    function validateQuantity(e) {
        const value = e.target.value;
        const newError = {...error};
        if (value && value <= 0) {
            newError.quantity = <p className='error-message'>Invalid quantitiy</p>
        } else {
            delete newError.quantity;
        }

        setError(newError);
        handleChange(value, order.id);
    }
    return (
        <div className="order" aria-label='Unmade order'>
            {/* This image will be repalced by an image we fetch 
                from the api eventually */}
            <img src={ order.product_image_url } alt="Produce" />

            {/* This static data will also be replaced by data coming
                from the api */}
            
            <div className="order-details">
                <h3 className="order-name">{order.product_name}</h3>
                <p className="price-per-pound">${order.product_price} / kg</p>
                <p className="vendor">Vendor: {order.vendor_name}</p>

                <div className="order-btns">
                    <button className="order-now-btn" disabled={error.quantity}
                            onClick={() => {handleOrder(order)}}>Order now</button>
                    <button className="remove-btn"
                            onClick={() => {removeOrder(order.id)}}>Remove</button>
                </div>
            </div>

            {/* This is where a user would enter the amount of the particular
                produce that they want */}
            <div className="quantity-input">
                <span id="hiddenLabel">Enter the desired quantity:</span>
                <input type="number" placeholder="1kg" name="quantity input" aria-labelledby='hiddenLabel' onChange={(e) => {validateQuantity(e)}} aria-describedby={`quantity-error ${error.quantity ? 'error' : ''}`} />
                <br />
                {/* Display an error message if there is an issue with the input */}
                <span id='quantity-error' className='quantity-error-message'>
                    {error.quantity}
                </span>
            </div>
        </div>
    )
};
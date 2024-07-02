import { useState } from 'react';

import '../styles/VendorProducts.css';

export default function VendorProduct({ product, changeQuantity, removeProduct }) {
    // This component is for the individual product items that will be displayed
    // on the product page

    // Keeps track of weather change quantity is clicked or not
    const [ quantityModal, setQuantityModal ] = useState(false);
    // Keeps track of the quantity input 
    const [ quantity, setQuantity ] = useState("");
    const [ error, setError ] = useState({});

    // When the change qunatity button is pressed, display a quantity input
    // When cancel/continue is pressed, display the change quantity and remove buttons instead
    const toggleQuantityModal = () => {
        setQuantityModal(!quantityModal);
        setQuantity("");
    };

    function handleChangeQuantity(e) {
        setQuantity(e.target.value);

        const newError = validateQuantity(e.target.value);
        setError(newError);
    }

    function validateQuantity(value) {
        const newError = {...error};
        if (value && value <= 0) {
            newError.quantity = <p className='error-message'>Invalid quantitiy</p>
        } else {
            delete newError.quantity;
        }

        return newError;
    }


    // If quantity input is emtpy, display a cancel button. Else display a continue button
    const continueOrCancel = (
        quantity === "" ? (
            <button className="cancel-quantity-btn"
                    onClick={toggleQuantityModal}>
                Cancel
            </button>
        ) : (
            <button className="enter-quantity-btn" disabled={error.quantity}
                        onClick={() => {
                            changeQuantity(Number(quantity), product.id);
                            toggleQuantityModal();
                        }}>
                    Continue
            </button>
        )
    )

    const quantityInput = (
        <>
            <div className="quantity-input-container">
            <label htmlFor="quantity-input">Quantity: </label>
                <input type="number" name='quantity-input' id='quantity-input'
                       placeholder="1kg" onChange={handleChangeQuantity}
                       aria-describedby={`quantity-error ${error.quantity ? 'error' : ''}`}
                    />
                    {/* Display an error message if there is an issue with the input */}
                <span id='quantity-error' className='quantity-error-message'>
                    {error.quantity}
                </span>
                <br />
                {continueOrCancel}
            </div>
        </>
    )

    // console.log(product);

    return (
        <div className="product" aria-label='Product item'>
            {/* This image will eventually be replaced by an image coming from an API */}
            <div className="product-image">

                <img src={ product.image } alt="product" />

            </div>

            {/* This data will also be replaced by data from the API. */}
            <div className="product-info">
                <div className="product-details">
                    <h3 className="prodice-name">{product.name}</h3>
                    <p className="price-per-pound">${product.price} / kg</p>
                    <p className="available-quantity">Available quantity: {product.stock_count ? product.stock_count : 20}kgs</p>
                </div>

                {quantityModal ? quantityInput : (
                    <div className="product-btns">
                        <button className="change-quantity-btn"
                                onClick={toggleQuantityModal}>
                                    Change quantity
                        </button>
                        <button className="remove-product"
                            onClick={() => removeProduct(product.id)}>
                                Remove
                    </button>
                    </div>
                    )}
            </div>
        </div>
    )
};
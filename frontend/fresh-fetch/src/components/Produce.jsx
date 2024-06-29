import { useState } from 'react';

import '../styles/Produce.css';

import gingerImg from '../images/ginger.jpg';

export default function Produce({ product, addToBasket, handleMakeOrder }) {
    // This component is for the individual produce items that will be displayed
    // on the produce page

    // Keeps track of weather the quantity input box should be displayed or not
    const [ quantityModal, setQuantityModal ] = useState(false);

    // Individual state to keep track of the entered quantity
    const [ quantity, setQuantity ] = useState("");

    const toggleQuantityModal = () => {
        setQuantityModal(!quantityModal);
        setQuantity("");
    };

    // Display a continue button if qunatity is not set. A cencel button if not
    const continueOrCancel = (
        quantity === "" ? (
            <button className="cancel-quantity-btn"
                    onClick={toggleQuantityModal}>
                Cancel
            </button>
        ) : (
            <button className="enter-quantity-btn"
                        onClick={() => {handleMakeOrder(product.id)}}>
                    Continue
            </button>
        )
    )

    // Handles changes in the qunaitty input field.
    function handleChangeQuantity(e) {
        setQuantity(e.target.value);
    }

    const quantityInput = (
        <>
            <div className="quantity-input-container">
            <label htmlFor="quantity-input">Quantity: </label>
                <input type="number" name='quantity-input' id='quantity-input'
                       placeholder="1kg" onChange={handleChangeQuantity} />
                <br />
               {continueOrCancel}
            </div>
        </>
    )

    return (
        <div className="produce" aria-label='Produce item'>
            <div className="produce-image">
                <img src={ gingerImg } alt="Image of produce" />
            </div>

            <div className="produce-info">
                <div className="produce-details">
                    <h3 className="produce-name">{product.name}</h3>
                    <p className="price-per-pound">${product.price} / kg</p>
                    <p className="vendor">Vendor: Change to vendor name</p>
                </div>

                {/* When order now is clicked, a quantity input will replace order now and
                    Add to basket buttons */}
                {quantityModal ? quantityInput : (
                    <div className="produce-btns">
                        <button className="order-now-btn"
                                onClick={toggleQuantityModal}>Order now
                        </button>
                        <button className="add-to-basket"
                            onClick={() => addToBasket(product)}>
                        Add to basket
                    </button>
                    </div>
                    )}
            </div>
        </div>
    )
};
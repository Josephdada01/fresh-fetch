import { useState } from 'react';
import { useNavigate } from 'react-router';

import '../styles/VendorProducts.css';

export default function VendorProduct({ product, handleRemoveBasket }) {
    // This component is for the individual product items that will be displayed
    // on the product page

    const [ quantityModal, setQuantityModal ] = useState(false);
    const [ quantity, setQuantity ] = useState("");

    const navigate = useNavigate();


    const toggleQuantityModal = () => {
        setQuantityModal(!quantityModal);
        setQuantity("");
    };

    const makeOrder = () => {
        const pricePerPound = product.pricePerPound;
        // product.quantity = Number(quantity);
        const price = pricePerPound * Number(quantity);
        console.log('PpP: ', pricePerPound, 'quanitity:', 'price:', price)
        navigate('/summary', { state: { orders: [product] } });
    }

    function handleChangeQuantity(e) {
        setQuantity(e.target.value);
    }

    const quantityInput = (
        <>
            <div className="quantity-input-container">
            <label htmlFor="quantity-input">Quantity: </label>
                <input type="text" name='quantity-input' id='quantity-input'
                       placeholder="1lb" onChange={handleChangeQuantity} />
                <br />
                <button className="enter-quantity-btn"
                        onClick={makeOrder}
                        disabled={quantity === ""}>Continue</button>
            </div>
        </>
    )

    return (
        <div className="product" aria-label='Product item'>
            {/* This image will eventually be replaced by an image coming from an API */}
            <div className="product-image">
                <img src={ product.pic } alt="Image of product" />
            </div>

            {/* This data will also be replaced by data from the API. */}
            <div className="product-info">
                <div className="product-details">
                    <h3 className="prodice-name">{product.name}</h3>
                    <p className="price-per-pound">${product.pricePerPound} / lb</p>
                    <p className="available-quantity">Available quantity: {product.quantity}lbs</p>
                </div>

                {quantityModal ? quantityInput : (
                    <div className="product-btns">
                        <button className="change-quantity-btn"
                                onClick={toggleQuantityModal}>
                                    Add quantity
                        </button>
                        <button className="remove-product"
                            onClick={() => handleRemoveBasket(product.id)}>
                                Remove
                    </button>
                    </div>
                    )}
            </div>
        </div>
    )
};
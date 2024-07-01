import '../styles/VendorOrder.css'

export default function VendorOrder({ order, handleFulfill }) {
    return (
        <div className="vendor-order" aria-label="Vendor order">
            <img src={order.product_image} alt="order" />
            
            <div className="order-details">
                <h3 className="order-name">{order.product_name}</h3>
                <p className="price">{order.product_price}</p>
                <p className="quantity">Quantity: {order.quantity}kg</p>
            </div>

            {/* This status will be either pending, confirmed or cancelled */}
            <div className="status">
                <small className={order.order_status}>{order.order_status}</small>
            </div>

            {/* Instead of ordering or confirming, the vendor has the fulfill
                button */}
            {order.order_status === "pending" && (
                <div className="btn-container">
                    <button className="fulfill-btn"
                            onClick={() => {handleFulfill(order)}}>
                                Fulfill
                    </button>
                </div>
            )}
            
        </div>
    )
}
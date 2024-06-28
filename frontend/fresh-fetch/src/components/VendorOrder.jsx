import '../styles/VendorOrder.css'

export default function VendorOrder({ order, handleFulfill }) {
    return (
        <div className="vendor-order" aria-label="Vendor order">
            <img src={order.pic} alt="order" />
            
            <div className="order-details">
                <h3 className="order-name">{order.name}</h3>
                <p className="price">{order.price}</p>
                <p className="quantity">Quantity: {order.quantity}kg</p>
            </div>

            {/* This status will be either pending, confirmed or cancelled */}
            <div className="status">
                <small className={order.status}>{order.status}</small>
            </div>

            {/* Instead of ordering or confirming, the vendor has the fulfill
                button */}
            {order.status === "Pending" && (
                <div className="btn-container">
                    <button className="fulfill-btn"
                            onClick={() => {handleFulfill(order.id)}}>
                                Fulfill
                    </button>
                </div>
            )}
            
        </div>
    )
}
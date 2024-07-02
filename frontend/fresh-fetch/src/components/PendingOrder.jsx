import "../styles/PendingOrder.css";
import tomatoImg from "../images/tomato.jpg";

export default function PendingOrder({ order, cancelOrder, confirmOrder }) {
    /* This component is for the individual order items that will be displayed
    in the pending area of the basket. The orders are made and the user is
    waiting for them to be delivered.*/

    const price = Number(order.product_price) * Number(order.quantity);

    return (
        <div className="pending-order" aria-label="Pending/Cancelled order">
            {/* This image will be replaced by an image we fetch 
                from the api eventually */}
            <img src={ tomatoImg } alt="produce" />

            {/* This static data will also be replaced by data coming
                from the api */}
            <div className="order-details">
                <h3 className="order-name">{order.product_name}</h3>
                <p className="price">Price: ${price}</p>
                <p className="quantity">Quantity: {order.quantity} kgs</p>
                <p className="vendor">Vendor: {order.vendor_name}</p>
                
                {order.order_status === "pending" && <div className="order-btns">
                    <button className="confirm-btn"
                            onClick={() => {confirmOrder(order)}}>Confirm</button>
                    <button className="cancel-btn"
                            onClick={() => {cancelOrder(order.id)}}>Cancel</button>
                </div>}
            </div>

            {/* This status will be either pending, confirmed or cancelled */}
            <div className="status">
                <small className={order.order_status}>{order.order_status}</small>
            </div>
        </div>
    )
};

import "../styles/SuccessPopup.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

export default function Popup({ status, message, handleClose }) {
    return (
        <div className="message-container">
            <button className="close-btn" onClick={handleClose}><IoIosCloseCircleOutline className="close-icon"/></button>
            <p className={status}>{message}</p>
            <FaCheckCircle className="success-icon" />
        </div> 
    )
}
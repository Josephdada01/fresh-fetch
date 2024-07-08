import "../styles/SuccessPopup.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoWarningSharp } from "react-icons/io5";

export default function Popup({ message, handleClose }) {
    return (
        <div className="message-container">
            <button className="close-btn" onClick={handleClose}><IoIosCloseCircleOutline className="close-icon"/></button>
            <p className={status}>{message}</p>
            <IoWarningSharp className="warning-icon" />
        </div> 
    )
}

import "../styles/Header.css";
import { useNavigate } from "react-router";

export default function Header({ isVendor, user }) {
    const navigate = useNavigate();

    const goToProducePage = () => {

        user && navigate('/produce', { state: { user: user}});
    }

    const goToVendorDashboard = () => {
        user && navigate('/dashboard', { state: { user: user }});
    }

    return (
        <div className="header">
            {/* If user is a buyer go to the produce page 
                If user is a vendor go to the vendor dashboard*/}
                {isVendor ? (
                    <h1 onClick={goToVendorDashboard}>Fresh Fetch</h1>
                ): (
                    <h1 onClick={goToProducePage}>Fresh Fetch</h1>
                )}
        </div>
    )
}
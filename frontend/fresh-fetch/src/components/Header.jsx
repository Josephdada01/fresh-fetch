import "../styles/Header.css";
import { useNavigate } from "react-router";

export default function Header({ isVendor, user }) {
    const navigate = useNavigate();

    const goToProducePage = () => {
        // console.log('User in header:', user);
        navigate('/produce', { state: { user: user}});
    }

    const goToVendorDashboard = () => {
        navigate('/dashboard');
    }
    return (
        <div className="header">
                {isVendor ? (
                    <h1 onClick={goToVendorDashboard}>Fresh Fetch</h1>
                ): (
                    <h1 onClick={goToProducePage}>Fresh Fetch</h1>
                )}
        </div>
    )
}
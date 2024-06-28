import "../styles/Logout.css";

export default function Logout({ handleLogout }) {
    // Display the logout button
    return (
        <button className="logout" onClick={handleLogout}>Logout</button>
    )
}
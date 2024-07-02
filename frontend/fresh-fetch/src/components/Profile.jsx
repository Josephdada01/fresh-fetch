import "../styles/Profile.css";

export default function Profile({ profilePic }) {
    // Displays the profile picture
    return (
        <div className="profile" aria-label="Profile">
            <img src={profilePic} alt="Profile" />
        </div>
    )
}
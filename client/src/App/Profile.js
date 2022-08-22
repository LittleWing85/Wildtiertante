import BioEditor from "./BioEditor";
import ProfilePicture from "./ProfilePicture";

export default function Profile({ user, onBioUpdate }) {
    return (
        <div className="profile">
            <aside className="sidebar">
                <ProfilePicture {...user} />
            </aside>
            <div className="content">
                <h2>
                    {user.first_name} {user.last_name}
                </h2>
                <BioEditor bio={user.bio} onBioUpdate={onBioUpdate} />
            </div>
        </div>
    );
}

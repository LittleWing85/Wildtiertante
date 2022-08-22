const DEFAULT_AVATAR = "/default_avatar.jpg";

export default function ProfilePicture({
    first_name,
    last_name,
    profile_picture_url,
    onClick,
}) {
    const src = profile_picture_url || DEFAULT_AVATAR;
    const initials = `${first_name[0]}${last_name[0]}`;
    return (
        <img
            className="profile-picture"
            src={src}
            alt={initials}
            onClick={onClick}
        />
    );
}

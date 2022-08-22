export default function ProfilePictureUploader({ onUpload, onClose }) {
    function onSubmit(event) {
        event.preventDefault();
        fetch("/api/users/profile", {
            method: "POST",
            body: new FormData(event.target),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert("Error uploading avatar!");
                    return;
                }
                onUpload(data.profile_picture_url);
            });
    }

    return (
        <div className="profile-picture-uploader modal">
            <div className="modal-content form">
                <button className="close" onClick={onClose}>
                    ✕
                </button>
                <h2>Upload new profile image</h2>
                <form onSubmit={onSubmit}>
                    <input type="file" name="file" required accept="image/*" />
                    <button type="submit">Upload</button>
                </form>
            </div>
        </div>
    );
}

// class ProfilePictureUploader extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             file: null,
//             isLoading: false,
//         };
//         this.onSubmit = this.onSubmit.bind(this);
//         this.onChange = this.onChange.bind(this);
//     }
//     onSubmit(event) {
//         event.preventDefault();

//         this.setState({ isLoading: true });

//         const formData = new FormData();
//         formData.append("file", this.state.file);

//         ("/api/user/profile", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             })
//             .then((response) => {
//                 this.setState({ isLoading: false });
//                 this.props.onUpload(response.data.profilePicURL);
//             });
//     }
//     onChange(event) {
//         this.setState({ file: event.target.files[0] });
//     }
//     render() {
//         return (

//         );
//     }
// }

// export default ProfilePictureUploader;

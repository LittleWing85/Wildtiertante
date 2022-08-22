import { Component } from "react";

import Profile from "./Profile";
import ProfilePicture from "./ProfilePicture";
import ProfilePictureUploader from "./ProfilePictureUploader";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                first_name: "",
                last_name: "",
                profile_picture_url: "",
            },
            showModal: false,
        };

        this.onProfilePictureClick = this.onProfilePictureClick.bind(this);
        this.onProfilePictureUpload = this.onProfilePictureUpload.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.onBioUpdate = this.onBioUpdate.bind(this);
    }
    onBioUpdate(bio) {
        this.setState({
            user: { ...this.state.user, bio },
        });
    }
    onProfilePictureClick() {
        this.setState({ showModal: true });
    }
    onProfilePictureUpload(profile_picture_url) {
        this.setState({
            user: {
                ...this.state.user,
                profile_picture_url,
            },
            showModal: false,
        });
    }
    onModalClose() {
        this.setState({ showModal: false });
    }
    componentDidMount() {
        fetch("/api/users/me")
            .then((response) => response.json())
            .then((user) => this.setState({ user }));
    }

    render() {
        return (
            <section className="app">
                <header>
                    <nav className="nav">
                        <div className="nav-content">
                            <a href="#">Home</a>
                        </div>
                    </nav>
                    <div className="user">
                        <span>
                            Welcome <strong>{this.state.user.firstName}</strong>
                            !
                        </span>
                        <ProfilePicture
                            {...this.state.user}
                            onClick={this.onProfilePictureClick}
                        />
                    </div>
                </header>
                <section className="container">
                    <Profile
                        user={this.state.user}
                        onBioUpdate={this.onBioUpdate}
                    />
                </section>
                <footer>
                    <div>
                        <span>(c) 2022 SPICED Academy</span>
                    </div>
                </footer>
                {this.state.showModal && (
                    <ProfilePictureUploader
                        onUpload={this.onProfilePictureUpload}
                        onClose={this.onModalClose}
                    />
                )}
            </section>
        );
    }
}

export default App;

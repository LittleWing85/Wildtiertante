import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
    }
    async onSubmit(event) {
        event.preventDefault();
        const bio = event.target.bio.value;
        const response = await fetch("/api/users/me", {
            method: "PUT",
            body: JSON.stringify({ bio }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status >= 400) {
            alert("Error saving bio");
            return;
        }
        this.props.onBioUpdate(bio);
        this.toggleEditing();
    }
    toggleEditing() {
        this.setState({
            isEditing: !this.state.isEditing,
        });
    }
    render() {
        return (
            <div className="bio-editor">
                {this.state.isEditing ? (
                    <form onSubmit={this.onSubmit}>
                        <textarea
                            name="bio"
                            defaultValue={this.props.bio}
                            required
                            rows={3}
                            cols={40}
                            placeholder="Write your bio here"
                        />
                        <p>
                            <button className="action">Save</button>
                        </p>
                    </form>
                ) : (
                    <>
                        <p>{this.props.bio}</p>
                        <p>
                            <button
                                onClick={this.toggleEditing}
                                className="action"
                            >
                                {this.props.bio ? "Edit bio" : "Enter bio"}
                            </button>
                        </p>
                    </>
                )}
            </div>
        );
    }
}

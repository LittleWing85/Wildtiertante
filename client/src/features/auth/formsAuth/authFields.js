// This file includes all information about input fields for registration and login

const REGISTRATION_INPUT_FIELDS = [
    {
        id: "name",
        labelText: "Name",
        name: "name",
        type: "text",
        required: true,
        placeholder: "Name deiner Tierschutzeinrichtung",
    },
    {
        id: "email",
        labelText: "Emailadresse",
        name: "email",
        type: "email",
        required: true,
        placeholder: "Deine Emailadresse",
    },
    {
        id: "password",
        labelText: "Passwort",
        name: "password",
        type: "password",
        required: true,
        placeholder: "Dein Passwort",
    },
];

const LOGIN_INPUT_FIELDS = [
    {
        id: "email",
        labelText: "Email",
        name: "email",
        type: "email",
        required: true,
        placeholder: "Deine Emailadresse",
    },
    {
        id: "password",
        labelText: "Passwort",
        name: "password",
        type: "password",
        required: true,
        placeholder: "Dein Passwort",
    },
];

export { REGISTRATION_INPUT_FIELDS, LOGIN_INPUT_FIELDS };

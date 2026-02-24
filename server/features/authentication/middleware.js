const requireAuthentication = (request, response, next) => {
    if (!request.session.user_id) {
        return response.status(401).json({ error: "Not logged in" });
    }
    next();
};

export { requireAuthentication };

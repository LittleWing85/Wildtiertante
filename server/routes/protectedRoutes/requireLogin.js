const requireLogin = (request, response, next) => {
    if (!request.session.user_id) {
        return response.status(401).json({ error: "Not logged in" });
    }
    next();
}; // additional checks can be added later in here (admin, blocked users...)

export default requireLogin;

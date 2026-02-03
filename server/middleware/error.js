const centralErrorHandler = (error, request, response, next) => {
    console.error("Server error:", error);
    if (response.headersSent) return next(error);
    response.status(error.status || 500).json({
        error: error.message || "Internal Server Error",
    });
};

export default centralErrorHandler;

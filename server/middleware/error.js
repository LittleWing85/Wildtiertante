// Central error handling

import { isProd } from "../config/env.js";

const centralErrorHandler = (error, request, response, next) => {
    console.error("Server error:", error);
    if (response.headersSent) return next(error);
    if (error.isOperational) {
        return response.status(error.status).json({
            error: error.message,
            ...(!isProd && { stack: error.stack }),
        });
    } else {
        return response.status(500).json({
            error: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später noch einmal.",
            ...(!isProd && { stack: error.stack }),
        });
    }
};

export default centralErrorHandler;

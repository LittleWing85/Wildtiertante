// Central error handling

import { isProd } from "../config/env.js";

const centralErrorHandler = (error, request, response, next) => {
    console.error("Server error:", error);
    if (response.headersSent) return next(error);
    response.status(error.status || 500).json({
        error: "Unerwarteter Fehler. Bitte versuche es später noch einmal.",
        ...(!isProd && { stack: error.stack }),
    });
};

export default centralErrorHandler;

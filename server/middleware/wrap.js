// Ensures that errors from asynchronous route handlers are automatically forwarded to central error handling

const wrap = (fn) => (request, response, next) => {
    Promise.resolve(fn(request, response, next)).catch(next);
};

export default wrap;

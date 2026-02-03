// helper to wrap async route handlers
const wrap = (fn) => (request, response, next) => {
    Promise.resolve(fn(request, response, next)).catch(next);
};

export default wrap;

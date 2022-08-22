const { getUserById } = require("./server/db");

async function wait(ms) {
    return new Promise((resolve) => {
        console.log("middle");
        setTimeout(resolve, ms);
    });
}

(async () => {
    console.log("before");
    await wait(1000);
    console.log("after");
})();

// // Promise.all([getUserById(1), getUserById(2)]).then((users) => {
// //     console.log(users);
// // });

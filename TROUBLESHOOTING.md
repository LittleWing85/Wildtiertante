# What if things go wrong

Quite often while working on it, your codebase will be in a not desireable state: basically it won't do what you expect it to do!

There are various reasons for that, let's see the most common ones.

## Static errors

Static errors are mostly syntax errors that are detected _before_ running the code. Modern dev environments detect them beforehand and warn you about them (via eslint for instance). It is crucial to pay attention to such warning and get rid of them.

For instance the following code will produce a syntax error:

```js
function sum(a, b) {
    return a + b
// missing closing } !
```

Same for the following:

```js
function sum(a, b) {
    return a + c;
}
```

Here we have two problems: variable `b` is unused, and variable `c` is undefined! Simply rename `c` to `b` et voilá presto.

## Runtime errors

Runtime errors are harder to catch, because the dev env has an harder time in catching them (at least with JS and not TypeScript).

Example:

```js
function sendEmail(user) {
    console.log(`Sending email to ${user.email}`);
}

sendEmail();
```

The code will bark about:

```
Uncaught TypeError: Cannot read properties of undefined (reading 'email')
    at sendEmail (<anonymous>:2:42)
    at <anonymous>:5:1
```

Because `sendEmail` has been called without arguments, making then `user` undefined, and accessing the `email` property of undefined results in the error above.

Fix: pass the desired parameter to the function.

Other errors may be type mismatches:

```js
function getNegatives(numbers) {
    return numbers.filter(x => x < 0);
}

getNegatives(1, 2, 3, -4);
```

`getNegatives` is expecting an array of numbers, while we are passing the numbers as separate args to the function, resulting in trying to call `.filter` on the first argument (the number 1):

```
Uncaught TypeError: numbers.filter is not a function
    at getNegatives (<anonymous>:2:20)
    at <anonymous>:5:1
```

Fix: wrap your args in `[]`.

Important: frontend runtime errors are logged in the **browser console**, while backend ones are logged in the **server terminal tab**.

Same applies for your `console.log` statements:

- server files -> server tab;
- frontend files -> browser console!

### Integration errors

Your JS may be immaculate and still no matching your expectations. Let's check the following scenario:

```js
fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email: ..., password: ....})
})
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            // wrong credentials!
            return;
        }
        // right credentials.
    });
```

And in the server:

```js
app.post('/api/login', (request, response) => {
    console.log('POST /api/login', request.body);
    login(request.body).then(user => {
        if (!user) {
            response.status(401).json({ error: 'wrong credentials' });
            return;
        }
        response.json(user);
    });
});
```

When you try to login, you will be rejected even with the right credentials, why?
Observe how the `request.body` is empty on every submit. Are we sending actual data? Checking the **payload** section of the corresponding HTTP request in the Network tab will contain the right form data, so what?

We missed the right HTTP headers!

```js
fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email: ..., password: ....}),
    headers: {
        'Content-Type' : 'application/json'
    }
})
```

Similar considerations apply if you mistype some fields in the sent data, but you would get meaningful messages in the server terminal.

## TL;DR - Full-Stack debugging cheatsheet

Client Side

| problem                           | where to look             | what to do                                |
|-----------------------------------|---------------------------|-------------------------------------------|
| static eslint errors              | VSCode / webpack terminal | read the logs and follow the hints        |
| runtime errors in the browser     | browser console           | fix the frontend code                     |
| runtime errors in the server      | server terminal tab       | fix the backend code                      |
| http request not going well       | network tab               | see if requested URL is right             |
| http request not going well       | network tab               | see if sent payload looks right           |
| http request not going well       | network tab               | see if request headers look right         |
| database data not saved           | server terminal tab       | pass the right params to the db function  |
| database data not saved           | server terminal tab       | check $1, $2 params                       |
| database data not saved           | server terminal tab       | check query `RETURNING *` missing perhaps |
| http request still not going well | network tab               | see if the right data is returned         |
| http request still not going well | server code               | see if `request.json` is right called     |
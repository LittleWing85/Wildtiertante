# React

You can work in a codesandbox (or more!) - they are free and very handy.

Just go here - https://codesandbox.io/s/react-new - sign in via github.

## JSX

JSX is a syntax that allows you to use js and html-like code in the same page. The goal is to have a better developer experience!

```jsx
function App() {
    return (
        <div className="app">
            <h1>Welcome to React!</h1>
            <p>This is our first app</p>
        </div>
    );
}
```

This would not be valid js (copy-paste it in the browser console to test it yourself, but in the React infrastructure, it works).
We are not discussing the react infrastructure now - just get something moving on screen!

You can interpolate both text an attributes with a similar syntax in JSX:

```jsx
const title = 'Welcome to react!';
const classToUse = 'app';

function App() {
    return (
        <div className={classToUse}>
            <h1>{title}</h1>
            <p>This is our first app</p>
        </div>
    );
}
```

You can do things like:

```jsx
const number = 5;

function App() {
    return (
        <div className="app" id={`my_app_${number}`}>
            <h1>Welcome to React!</h1>
            <p>This is our first app</p>
        </div>
    );
}
```

## (Functional) Components

Besides HTML tags, one can define custom components. There are 2 types of components in React: the old **class-based components**, and the more modern (and better) **functional components**.

Let's have a look at the second first:

```jsx
function UserView(props) {
  return (
    <article className={props.className}>
      <h2>{props.user.name}</h2>
      <a href={`mailto:${props.user.email}`}>Write me</a>
    </article>
  );
}
```

A functional component is a function that takes a single argument (the `props`), and returns a JSX block.
In the JSX block you can interpolate the props like discussed before.

More often than not, props are destructured in the argument place:

```jsx
function UserView({ user, className }) {
  return (
    <article className={className}>
      <h2>{user.name}</h2>
      <a href={`mailto:${user.email}`}>Write me</a>
    </article>
  );
}
```

How to use components? Like normal tags!

```jsx
const user =   {
    name: "diego",
    email: "diego@spiced.com"
};

function App() {
    return (
        <div className="App">
            <h1>Welcome to react!</h1>
            <UserView user={users} className="user-view" />
        </div>        
    )
}

function UserView({ user, className }) {
  return (
    <article className={className}>
      <h2>{user.name}</h2>
      <a href={`mailto:${user.email}`}>Write me</a>
    </article>
  );
}
```

## Handling events

HTML tags come with `onClick`, `onMouseEnter`, `onMouseLeave` attributes, to which you can assign functions like:

```jsx
function UserView({ user, className }) {
  function onButtonClick() {
    alert(user.name);
  }

  return (
    <article className={className}>
      <h2>{user.name}</h2>
      <a href={`mailto:${user.email}`}>Write me</a>
      <p>
        <button onClick={onButtonClick}>Like</button>
      </p>
    </article>
  );
}
```

We are mostly interested in:

- `<button onClick={...}>...`;
- `<form onSubmit={...}>...`;
- `<input onInput={...}>...`.
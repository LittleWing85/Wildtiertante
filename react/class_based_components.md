# Class Based Components

This is the initial code for a form component:

```jsx
import { Component } from "react";

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // here we will define the initial state of the component
        // much like what we returned from the data() method of Vue
    };
  }
  componentDidMount() {
    console.log("mounted form!", this.props);
    // place for making the initial fetch GET call
    // like mounted() in vue
  }
  render() {
    return (
      <form>
        <h2>{this.props.title}</h2>
        <input name="first_name" required placeholder="First Name"/>
        <button>Send</button>
      </form>
    );
  }
}
```

You can use like this:

```jsx
function App() {
    return (
        <div className="app">
            <MyForm title="Form title!"/>
        </div>
    )
}
```

Observe how the title is not defined inside the title, but is coming from outside. We will now make some changes that will determine the look of the component _from inside the component_, more precisely we will display an error message if the user is typing a name longer than 5 letters.

Displaying the error message or not implies a change on the _state_ of the component, we should then define the default state in the `this.state` object, like:

```jsx
class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        error: ''
    };
  },
  ...
}
```

It's fine to define it as an empty string.

Now we have to listen for the user input - this is a bit painful to do in class based components:

1. define the event handler method;
2. bind it in the constructor;
3. assign it to the `<input>`.

```jsx
class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        error: ''
    };
    // #2 binding
    this.onNameInput = this.onNameInput.bind(this);
  }
  // #1 defining
  onNameInput(event) {
    console.log('onNameInput', event.target.value);
  }
  render() {
    return (
      <form>
        <h2>{this.props.title}</h2>
        <input
            onInput={this.onNameInput} // #3 assigning
            name="first_name" required placeholder="First Name"/>
        <button>Send</button>
      </form>
    );
  }
}
```

Now you should get a log with the input value, when the input changes.

Let's update the state! First, we have to use something from `this.state` in the render method, like:

```jsx
  render() {
    return (
      <form>
        <h2>{this.props.title}</h2>
        <input
            onInput={this.onNameInput} // #3 assigning
            name="first_name" required placeholder="First Name"/>
        <button>Send</button>
        <p>{this.state.error}</p>
      </form>
    );
  }
```

On the first render, it will render an empty paragraph (because `this.state.error` is `''` at the beginning).

In the `onNameInput` now:

```jsx
  onNameInput(event) {
    if (event.target.value.length > 5) {
        this.setState({
            error: 'your name is too long!'
        });
    } else {
        this.setState({
            error: ''
        });
    }
  }
```

Check what's happening: the error message gets updated while typing!

You could apply this logic to various fields, with different decisions, and different error messages. That's very hard to maintain with vanilla JS.

Want to get rid of the empty paragraph? Use _conditional rendering_:

```jsx
  render() {
    return (
      <form>
        <h2>{this.props.title}</h2>
        <input
            onInput={this.onNameInput} // #3 assigning
            name="first_name" required placeholder="First Name"/>
        <button>Send</button>
        {this.state.error && <p>{this.state.error}</p>}
      </form>
    );
  }
```

Want to listen to the submit form event? Let's have a look at the complete component:

```jsx
class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onNameInput = this.onNameInput.bind(this);
  }
  onNameInput(event) {
    const first_name = event.target.value;
    if (first_name.length > 5) {
      this.setState({
        error: "your name is too long!"
      });
    } else {
      this.setState({
        error: ""
      });
    }
  }
  onSubmit(event) {
    event.preventDefault();
    const first_name = event.target.first_name.value;
    console.log("onSubmit", first_name);
    // place for making the fetch POST call in case
  }
  render() {
    console.log("RENDERING AGAIN", this.state);
    return (
      <form onSubmit={this.onSubmit}>
        <input
          onInput={this.onNameInput}
          name="first_name"
          required
          placeholder="First Name"
        />
        <button>Send</button>
        {this.state.error && <p>{this.state.error}</p>}
      </form>
    );
  }
}
```

Question: how to make the number 5 for the max length configurable? Hint: props are your friends!
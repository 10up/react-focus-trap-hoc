# react-focus-trap-hoc 1.0.1

React focus trap is a [higher order component](https://reactjs.org/docs/higher-order-components.html) intended to be used on components within a React application that may require focus to be driven to it, and then trapped within it until another action is taken by the user. A prime example of this would be a modal. From an accessibility standpoint, a user navigating a site with the keyboard may activate a modal, focus can be driven to the modal, and then remain inside the modal so the user can navigate through the content without focus being lost outside the modal.

## Instalation

**NPM**
```
npm install @10up/react-focus-trap-hoc --save
```

**Yarn**
```
yarn add @10up/react-focus-trap-hoc --save
```

## Usage

Let's use the following file as an example:

```javascript
  // Modal.jsgs
  import React, { Component } from 'react';

  class Modal extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
      }
    }

    // Other methods here that handle the actual open and close function of the modal.

    render() {
      return(
        <div id="modal">
          <p>Super fancy content with <a href="#">focusable elements</a> within the modal!</p>
          <button>Just a button here</button>
        </div>
      );
    }
  }

  export default Modal;
```

To ensure that focus is retained within your component, simply add the following:

```diff
  // Modal.js
  import React, { Component } from 'react';
+ import trapHOC from 'react-focus-trap-hoc';

  class Modal extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
      }
    }

+   componentDidMount() {
+     if (this.state.searchOpen === true) {
+       this.props.activateTrap();
+      } else {
+       this.props.deactivateTrap();
+     }
+   }

    // Other methods here that handle the actual open and close function of the modal.

    render() {
      return(
        <div id="modal">
          <p>Super fancy content with <a href="#"></a>focusable elements</a> within the modal!</p>
          <button>Just a button here</button>
        </div>
      );
    }
  }

- export default Modal;
+ export default trapHoc()(Modal);
```

## Documentation

### trapHoc(options={ trapIsActive: false })(YourWrappedComponent);
React focus trap HOC allows you to pass options to the HOC itself. By default `trapIsActive` is set to false. This option dictates whether or not focus should be trapped initially. This would need to be set `true` for instance, when using react focus trap HOC with a stateless functional component.

React focus trap HOC also passes two functions to your wrapped component as props:

### activateTrap()

`activateTrap()` changes the state on the HOC, telling it that the trap is active.

### deactivateTrap()

`deactivateTrap()` changes the state on the HOC, telling it that the trap is inactive.

`activateTrap()` and `deactivateTrap()` must be triggered on your component when state is changed on your wrapped component.

## Contribute

What to help or have a suggestion? Open a [new ticket](https://github.com/10up/react-focus-trap-hoc/issues/new) and we can discuss it or submit pull request. Thanks for your interest!

## License

MIT

## Like what you see?

<p align="center">
<a href="http://10up.com/contact/"><img src="https://10up.com/uploads/2016/10/10up-Github-Banner.png" width="850"></a>
</p>

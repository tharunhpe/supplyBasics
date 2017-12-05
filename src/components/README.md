# components

A component doesn't do any data fetching and expects data passed through via `props` and or `context` if it's a grandchild.
It represents a reusable component that can be used in many different contexts.
A component can have state.
A component expects high-level data.

A component can have styles for layouts. It should not have styles for visual stuff.

## JSX

> We are using `.js` extensions instead of `.jsx`.

#### Convention
  * Components should be dumb and only worry about how things look "Presentational".

  * Create stateless functions that take props passed down to them from the container.

  ```js
    export default ComponentName({prop1, prop2, prop,3}) {
      const stuff = `${prop1} and stuff`;
      return (
        <div>
          <div className="component-prettycomponent"></div>
        </div>
      );
    }
  ```

  - When attributes get longer than two (> 2) begin and indent on new line:

  ```js
  render() {
    <Component attr1={} attr2={} />
  }

  render() {
    <Component
      attr1={}
      attr2={}
      attr3={}
    />
  }
  ```
  - Always add PropTypes to the Element, Component, or Container this acts as an API and will help with debugging.

  ```js
  const propTypes = {
    action: PropTypes.func.isRequired,
    anotherAction: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired
  };

  export default function ComponentName() {
    ...
  }

  ComponentName.propTypes = propTypes;
  ```

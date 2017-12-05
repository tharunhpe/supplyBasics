# modules

When working with redux it's usually a common practice to abstract the process
into: `actions/*`, `constants/*`, and `reducers/*` directories.

Starting with declaring and exporting a constant -> then importing constant and
creating and exporting an action ->  then importing the action and constant and
then exporting the reducer.

This is tiresome, and can get really messy at scale. So a nice alternative is the
proposed [reducks](https://github.com/erikras/ducks-modular-redux) convention.
Where you group the mechanics encompassing redux for easy organization,
testability, and sanity.

Caveats:
* reducers still have to be imported on the `index.js` in the root of the modules.


Example of a file:

```javascript
/* index.js */

// Constant
export const NAME_OF_ACTION = 'NAME_OF_ACTION';

// Action
export function actionCreator(payload) = {
  type: NAME_OF_ACTION,
  payload
};

// Reducer
const initialState = {
  key: 'value'
};

export default function containerNameReducer(state = initialState, action) {
  switch(action.type) {
    case NAME_OF_ACTION:
      return state.set('key', action.data.value);
    default:
      return state;
  }
}
```

* We can see how easy is that to read? It's better than having 3 to 4 files open at a time to read.
* Everything is being exported to expose for testing, thereby everything can be imported from this single file to test.

* Things to take note of:
  - Action names and constant names should be the same (prefixed with the module name).
  - The reducer will always have `Reducer` appended to the end of the name.

Don't import:
* `constants`
* `actions`
* `reducers`


# module/index.js

> This file acts as a catalog for all reducers and then exported to be imported in `store/`.
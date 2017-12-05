# store

> This is redux's store, where we configure and add middleware,and where we wire
up our `components/ReduxDevTools` component.

We also handle logic here in how we apply our middleware depending on
`process.env.NODE_ENV` environment varaible.

Basically this directory is reserved for any store enhancers.

### The Gist of a redux store

The whole state of your app is stored in an object tree inside a single store.
The only way to change the state tree is to emit an action, an object describing what happened.
To specify how the actions transform the state tree, you write pure reducers.


Allowed import:
* `modules/subDir/index.js` -> this `index.js` catalogs and comprises of all our reducers.
* `components/ReduxDevTools` -> this component allows our store to be passed through.
* `./middleware/*` -> Any middleware within the `store/` that will enhance the redux-store.

Don't import:
* `*` -> You shouldn't need to import anything else, this is pretty much a set once or extended configurations.

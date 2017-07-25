# map-props-to-children

[![Build Status](https://travis-ci.org/nulogy/map-props-to-children.svg?branch=master)](https://travis-ci.org/nulogy/map-props-to-children)

Map injected [React](https://github.com/facebook/react) props from Higher Order Components to child components.

This is best used as an enhancement to the [Redux](https://github.com/reactjs/redux) [Container Pattern](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

# Installing

```sh
yarn add map-props-to-children
# Or
npm install --save map-props-to-children
```

# Usage

## Importing

```javascript
# ES6+
import mapPropsToChildren from "map-props-to-children";

# ES5
var mapPropsToChildren = require("map-props-to-children");
```

## API

This library includes the following function:

```javascript
mapPropsToChildren({ children, injectedProps, props })
```

Returns a list of the children components provided, but with new props injected into each child's props (shallow). The exported function has a fixed arity of 1 that accepts the following properties on the argument object:

- `children`: List of child components to clone and inject props into. Its existing props takes highest precedence
- `injectedProps`: The props that will be injected into child components. It takes second-highest precedence
- `props`: Props from the container component calling this function. Allows for the container to define some default prop values. It takes the lowest precedence

## Use Case

Suppose your project renders this dumb component:

```javascript
export default function StockTicker({ stocks }) {
  return (
    <div>
      <h2>Stock Ticker</h2>
      {stocks.map(stock => (
        <p><b>{stock.name}:</b> {stock.price}</p>
      )}
    </div>
  );
}
```

You will pass props to `StockTicker` via a Redux container, but you don't want the container know anything about the component so that they are decoupled from each other. A theoretical app that uses this container would look like so:

```javascript
export default function App() {
  return (
    <StockItemListContainer>
      <StockTicker />
    </StockItemListContainer>
  );
}
```

The `StockItemListContainer` knows nothing about the types of its children components, but can still inject props from the Redux state into them using `mapPropsToChildren`:

```javascript
function StockItemListContainer({ items, children, ...props }) {
  const injectedProps = { items };
  return (
    <div>
      {mapPropsToChildren({ children, injectedProps, props })}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    items: state.items,
  };
}

export default connect(mapStateToProps)(StockItemListContainer);
```

Now, you can easily reuse the same container for a different component that accepts the `items` prop:

```javascript
export default function Widget() {
  return (
    <StockItemListContainer>
      <StockWidget />
    </StockItemListContainer>
  );
}
```

# License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more details.

# Acknowledgements

This project was made possible through contributions from the following people:

- [@arturopie](https://github.com/arturopie)
- [@ecbrodie](https://github.com/ecbrodie)
- [@JaKXz](https://github.com/JaKXz)
- [@jerridan](https://github.com/jerridan)
- [@theinterned](https://github.com/theinterned)

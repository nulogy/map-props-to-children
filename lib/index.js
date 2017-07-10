import React from 'react';

export default function mapPropsToChildren ({ children, props, injectedProps }) {
  return React.Children.map(children, child => React.cloneElement(child, {
    ...props,
    ...injectedProps,
    ...child.props
  }));
}

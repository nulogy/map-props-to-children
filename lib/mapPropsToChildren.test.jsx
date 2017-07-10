import React from "react";
import { shallow } from "enzyme";
import mapPropsToChildren from "./lib";

const injectedProps = {
  injected: true,
};

// eslint-disable-next-line react/prop-types
function StubContainer({ children, ...props }) {
  return (<div>{ mapPropsToChildren({ children, props, injectedProps }) }</div>);
}

function Stub(props) {
  return (<div {...props}>{ Object.keys(props).join(", ") }</div>);
}

describe("#mapPropsToChildren", () => {
  test("injects props on one child", () => {
    const wrapper = shallow(
      <StubContainer>
        <Stub />
      </StubContainer>,
    );

    const child = wrapper.find(Stub);

    expect(child.props()).toEqual(injectedProps);
  });

  test("injects props on multiple children", () => {
    const wrapper = shallow(
      <StubContainer>
        <Stub />
        <Stub />
        <Stub />
      </StubContainer>,
    );

    const children = wrapper.find(Stub);

    expect(children).toHaveLength(3);
    children.forEach((child) => {
      expect(child).toHaveProp("injected", true);
    });
  });

  test("passes props to its children", () => {
    const wrapper = shallow(
      <StubContainer className="parent" parentProp>
        <Stub className="child" childProp injected="overridden" />
      </StubContainer>,
    );

    const child = wrapper.find(Stub);

    expect(child).toHaveLength(1);
    expect(child).toHaveClassName("child");
    expect(child).not.toHaveClassName("parent");
    expect(child.props()).toMatchObject({
      parentProp: true,
      childProp: true,
      injected: "overridden",
    });
  });
});

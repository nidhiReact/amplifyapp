import React from "react";
import { shallow, mount, render } from "./enzyme";
import App from "./App";

describe("App test Suite", () => {
  it("Login or Counter", () => {
    const wrapper = shallow(<App />);
    const comp = "Login";
    wrapper.find("#" + comp).simulate("click");
    expect(wrapper.state("whatToRender")).toEqual(comp);
  });
});

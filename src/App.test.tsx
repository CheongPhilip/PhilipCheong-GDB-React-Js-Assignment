import * as React from "react";
import {shallow} from "enzyme";
import App from "./App";

describe("Render Without Fail", () => {
    it("Should render without failure", () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find("Connect(LayoutComponent)").length).toEqual(1);
    });
});

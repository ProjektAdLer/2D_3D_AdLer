import React from "react";
import ReactDOM from "react-dom/client";
import App from "../../../../Core/Presentation/React/ReactEntryPoint/App";
import ReactEntry from "../../../../Core/Presentation/React/ReactEntryPoint/ReactEntry";

const createElementMock = jest.spyOn(React, "createElement");
const renderMock = jest.spyOn(ReactDOM, "createRoot");

describe("ReactEntry", () => {
  let systemUnderTest: ReactEntry;

  beforeEach(() => {
    systemUnderTest = new ReactEntry();
  });

  test.skip("setupReact", () => {
    systemUnderTest.setupReact();

    // TODO: extend this
    expect(createElementMock).toHaveBeenCalledTimes(3);
    expect(createElementMock).toHaveBeenNthCalledWith(1, App);
    expect(renderMock).toHaveBeenCalledTimes(1);
  });
});

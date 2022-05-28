import { Provider } from "inversify-react";
import React from "react";
import ReactDOM from "react-dom";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import App from "../../../../Core/Presentation/React/ReactEntryPoint/App";
import ReactEntry from "../../../../Core/Presentation/React/ReactEntryPoint/ReactEntry";

const createElementMock = jest.spyOn(React, "createElement");
const renderMock = jest.spyOn(ReactDOM, "render");

describe("ReactEntry", () => {
  let reactEntry: ReactEntry;

  beforeEach(() => {
    reactEntry = new ReactEntry();
  });

  test("setupReact", () => {
    reactEntry.setupReact();

    // TODO: extend this
    expect(createElementMock).toHaveBeenCalledTimes(3);
    expect(createElementMock).toHaveBeenNthCalledWith(1, App);
    expect(renderMock).toHaveBeenCalledTimes(1);
  });
});

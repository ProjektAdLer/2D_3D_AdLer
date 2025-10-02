import { render } from "@testing-library/react";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";

import React from "react";
import Settings from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/Settings";

jest.mock("~ReactComponents/Settings/SettingContent", () => "mocked");

describe("Settings", () => {
  test("should render", () => {
    render(
      <Provider container={CoreDIContainer}>
        <Settings />
      </Provider>,
    );
  });
});

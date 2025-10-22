import { render } from "@testing-library/react";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";

import React from "react";
import Privacy from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/Privacy";

jest.mock("~ReactComponents/Privacy/PrivacyContent", () => "mocked");

describe("Privacy", () => {
  test("should render", () => {
    render(
      <Provider container={CoreDIContainer}>
        <Privacy />
      </Provider>,
    );
  });
});

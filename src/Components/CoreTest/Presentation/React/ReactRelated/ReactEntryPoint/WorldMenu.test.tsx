import { render } from "@testing-library/react";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import WorldMenu from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/WorldMenu";

import React from "react";

jest.mock(
  "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar",
  () => "mocked"
);
jest.mock(
  "~ReactComponents/WorldMenu/WorldSelection/WorldSelection",
  () => "mocked"
);
jest.mock("~ReactComponents/WorldMenu/WorldDetail/WorldDetail", () => "mocked");

describe("WorldMenu", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should render", () => {
    render(
      <Provider container={CoreDIContainer}>
        <WorldMenu />
      </Provider>
    );
  });
});

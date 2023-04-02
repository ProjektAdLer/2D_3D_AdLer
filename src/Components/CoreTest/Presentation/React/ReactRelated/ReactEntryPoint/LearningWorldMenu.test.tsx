import { render } from "@testing-library/react";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import LearningWorldMenu from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/LearningWorldMenu";

import React from "react";

jest.mock(
  "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar",
  () => "mocked"
);
jest.mock(
  "~ReactComponents/LearningWorldMenu/LearningWorldSelection/LearningWorldSelection",
  () => "mocked"
);
jest.mock(
  "~ReactComponents/LearningWorldMenu/LearningWorldDetail/LearningWorldDetail",
  () => "mocked"
);

describe("LearningWorldMenu", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should render", () => {
    render(
      <Provider container={CoreDIContainer}>
        <LearningWorldMenu />
      </Provider>
    );
  });
});

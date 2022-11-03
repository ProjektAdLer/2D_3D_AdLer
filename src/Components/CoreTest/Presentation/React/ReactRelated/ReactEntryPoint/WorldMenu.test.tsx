import { render } from "@testing-library/react";
import { Provider } from "inversify-react";
import { mock } from "jest-mock-extended";
import ILoadWorldUseCase from "../../../../../Core/Application/UseCases/LoadWorld/ILoadWorldUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import WorldMenu from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/WorldMenu";

import React from "react";

jest.mock("~ReactComponents/SpaceMenu/HeaderBar/HeaderBar", () => "mocked");
jest.mock(
  "~ReactComponents/SpaceMenu/SpaceSelection/SpaceSelection",
  () => "mocked"
);
jest.mock(
  "~ReactComponents/SpaceMenu/DetailSection/DetailSection",
  () => "mocked"
);

const loadWorldUseCaseMock = mock<ILoadWorldUseCase>();

describe("WorldMenu", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(USECASE_TYPES.ILoadWorldUseCase).toConstantValue(
      loadWorldUseCaseMock
    );
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

import { render } from "@testing-library/react";
import { Provider } from "inversify-react";
import { mock } from "jest-mock-extended";
import ILoadWorldUseCase from "../../../../../Core/Application/UseCases/LoadWorld/ILoadWorldUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import SpaceMenu from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/SpaceMenu";

import React from "react";

jest.mock(
  "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar",
  () => "mocked"
);
jest.mock(
  "~ReactComponents/SpaceMenu/SpaceSelection/SpaceSelectionList",
  () => "mocked"
);
jest.mock("~ReactComponents/SpaceMenu/SpaceDetail/SpaceDetail", () => "mocked");

const loadWorldUseCaseMock = mock<ILoadWorldUseCase>();

describe("SpaceMenu", () => {
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
        <SpaceMenu />
      </Provider>
    );
  });
});

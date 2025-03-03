import { render } from "@testing-library/react";
import { Provider } from "inversify-react";
import { mock } from "jest-mock-extended";
import ILoadLearningWorldUseCase from "../../../../../Core/Application/UseCases/LoadLearningWorld/ILoadLearningWorldUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import LearningSpaceMenu from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/LearningSpaceMenu";

import React from "react";

jest.mock(
  "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar",
  () => "mocked",
);
jest.mock(
  "~ReactComponents/LearningSpaceMenu/LearningSpaceSelection/LearningSpaceSelection",
  () => "mocked",
);
jest.mock(
  "~ReactComponents/LearningSpaceMenu/LearningSpaceDetail/LearningSpaceDetail",
  () => "mocked",
);
jest.mock(
  "~ReactComponents/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModal",
  () => "mocked",
);

const loadWorldUseCaseMock = mock<ILoadLearningWorldUseCase>();

describe("LearningSpaceMenu", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadLearningWorldUseCase,
    ).toConstantValue(loadWorldUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should render", () => {
    render(
      <Provider container={CoreDIContainer}>
        <LearningSpaceMenu />
      </Provider>,
    );
  });
});

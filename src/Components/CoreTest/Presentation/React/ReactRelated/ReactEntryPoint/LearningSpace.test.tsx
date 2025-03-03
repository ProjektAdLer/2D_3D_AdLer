import { render } from "@testing-library/react";
import LearningSpace from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/LearningSpace";
import React from "react";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import { mock } from "jest-mock-extended";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IGetLearningWorldUseCase from "../../../../../Core/Application/UseCases/GetLearningWorld/IGetLearningWorldUseCase";

jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/BottomTooltip",
  () => "mocked",
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModal",
  () => "mocked",
);
jest.mock(
  "../../../../../Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManager",
  () => "mocked",
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBar",
  () => "mocked",
);
jest.mock(
  "../../../../../Core/Presentation/Babylon/SceneManagement/BabylonCanvas",
  () => "mocked",
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningWorldScorePanel/LearningWorldScorePanel",
  () => "mocked",
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceScorePanel/LearningSpaceScorePanel",
  () => "mocked",
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanel",
  () => "mocked",
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceNamePanel/LearningSpaceNamePanel",
  () => "mocked",
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModal",
  () => "mocked",
);
const getWorldUseCaseMock = mock<IGetLearningWorldUseCase>();

describe("LearningSpace.tsx", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBottomTooltipPresenter,
    ).toConstantValue(mock());
    // CoreDIContainer.bind(
    //   USECASE_TYPES.IGetLearningWorldUseCase,
    // ).toConstantValue(getWorldUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should render", () => {
    render(
      <Provider container={CoreDIContainer}>
        <LearningSpace />
      </Provider>,
    );
  });
});

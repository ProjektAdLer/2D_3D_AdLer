import { render } from "@testing-library/react";
import LearningSpace from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/LearningSpace";
import React from "react";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import { mock } from "jest-mock-extended";

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
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/LearningWorldScorePanel/LearningWorldScorePanel",
  () => "mocked",
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/LearningSpaceScorePanel/LearningSpaceScorePanel",
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

describe("LearningSpace.tsx", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBottomTooltipPresenter,
    ).toConstantValue(mock());
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

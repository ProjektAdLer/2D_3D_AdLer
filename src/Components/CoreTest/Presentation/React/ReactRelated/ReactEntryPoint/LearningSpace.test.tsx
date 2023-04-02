import { render } from "@testing-library/react";
import LearningSpace from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/LearningSpace";
import React from "react";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";

jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/BottomTooltip",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModal",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementsDropdown/LearningElementsDropdown",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManager",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBar",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/Babylon/SceneManagement/BabylonCanvas",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/ScorePanel/ScorePanel",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanel",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceNamePanel/LearningSpaceNamePanel",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceCompletionModal/LearningSpaceCompletionModal",
  () => "mocked"
);

describe("LearningSpace.tsx", () => {
  test("should render", () => {
    render(
      <Provider container={CoreDIContainer}>
        <LearningSpace />
      </Provider>
    );
  });
});

import { render } from "@testing-library/react";
import Space from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/Space";
import React from "react";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";

jest.mock(
  "../../../../../Core/Presentation/React/SpaceDisplay/BottomTooltip/BottomTooltip",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/ElementModal",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/SpaceDisplay/ElementsDropdown/ElementsDropdown",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManager",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/SpaceDisplay/SideBar/SideBar",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/Babylon/SceneManagement/BabylonCanvas",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanel",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/SpaceDisplay/SpaceGoalPanel/SpaceGoalPanel",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/SpaceDisplay/SpaceNamePanel/SpaceNamePanel",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/SpaceDisplay/SpaceCompletionModal/SpaceCompletionModal",
  () => "mocked"
);

describe("Space.tsx", () => {
  test("should render", () => {
    render(
      <Provider container={CoreDIContainer}>
        <Space />
      </Provider>
    );
  });
});

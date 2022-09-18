import { render } from "@testing-library/react";
import Space from "~ReactComponents/ReactRelated/ReactEntryPoint/Space";

jest.mock(
  "../../../../../Core/Presentation/React/LearningRoomDisplay/BottomTooltip/BottomTooltip",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningRoomDisplay/LearningElementModal/LearningElementModal",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningRoomDisplay/LearningElementsDropdown/LearningElementsDropdown",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningRoomDisplay/LearningWorldNamePanel/LearningWorldNamePanel",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningRoomDisplay/ModalManager/ModalManager",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/MoodleLoginForm/MoodleLoginForm",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/ReactRelated/ReactAdvancedComponents/LogoMenuBar",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/BabylonCanvas",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningRoomDisplay/ScorePanel/ScorePanel",
  () => "mocked"
);
jest.mock(
  "~ReactComponents/LearningRoomDisplay/LearningWorldGoalPanel/LearningWorldGoalPanel",
  () => "mocked"
);

describe("LearningRoom.tsx", () => {
  test("should render", () => {
    render(<Space />);
  });
});

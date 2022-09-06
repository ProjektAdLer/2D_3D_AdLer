import { render } from "@testing-library/react";
import LearningRoom from "~ReactComponents/ReactEntryPoint/LearningRoom";

jest.mock(
  "../../../../Core/Presentation/React/BottomTooltip/BottomTooltip",
  () => "mocked"
);
jest.mock(
  "../../../../Core/Presentation/React/LearningElementModal/LearningElementModal",
  () => "mocked"
);
jest.mock(
  "../../../../Core/Presentation/React/LearningElementsDropdown/LearningElementsDropdown",
  () => "mocked"
);
jest.mock(
  "../../../../Core/Presentation/React/LearningWorldNamePanel/LearningWorldNamePanel",
  () => "mocked"
);
jest.mock(
  "../../../../Core/Presentation/React/ModalManager/ModalManager",
  () => "mocked"
);
jest.mock(
  "../../../../Core/Presentation/React/MoodleLoginForm/MoodleLoginForm",
  () => "mocked"
);
jest.mock(
  "../../../../Core/Presentation/React/ReactAdvancedComponents/LogoMenuBar",
  () => "mocked"
);
jest.mock(
  "../../../../Core/Presentation/React/ReactEntryPoint/BabylonCanvas",
  () => "mocked"
);
jest.mock(
  "../../../../Core/Presentation/React/ScorePanel/ScorePanel",
  () => "mocked"
);
jest.mock(
  "~ReactComponents/LearningWorldGoalPanel/LearningWorldGoalPanel",
  () => "mocked"
);

describe("LearningRoom.tsx", () => {
  test("should render", () => {
    render(<LearningRoom />);
  });
});

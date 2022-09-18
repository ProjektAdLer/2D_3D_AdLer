import { render } from "@testing-library/react";
import Space from "~ReactComponents/ReactRelated/ReactEntryPoint/Space";

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
  "../../../../../Core/Presentation/React/SpaceDisplay/WorldNamePanel/WorldNamePanel",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManager",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/GeneralComponents/MoodleLoginForm/MoodleLoginForm",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/GeneralComponents/LogoMenuBar/LogoMenuBar",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/BabylonCanvas",
  () => "mocked"
);
jest.mock(
  "../../../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanel",
  () => "mocked"
);
jest.mock(
  "~ReactComponents/SpaceDisplay/WorldGoalPanel/WorldGoalPanel",
  () => "mocked"
);

describe("Space.tsx", () => {
  test("should render", () => {
    render(<Space />);
  });
});

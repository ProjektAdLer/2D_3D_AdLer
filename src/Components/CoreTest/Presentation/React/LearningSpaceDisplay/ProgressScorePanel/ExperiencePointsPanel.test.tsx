import { render } from "@testing-library/react";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import ExperiencePointsPanel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/ExperiencePointsPanel/ExperiencePointsPanel";
import { GradingStyle } from "../../../../../Core/Domain/Types/GradingStyle";
import ExperiencePointsPanelViewModel, {
  XPInfo,
} from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/ExperiencePointsPanel/ExperiencePointsPanelViewModel";
import Observable from "../../../../../../Lib/Observable";

describe("ExperiencePointsPanel", () => {
  let viewModelMock = new ExperiencePointsPanelViewModel();

  beforeEach(() => {
    viewModelMock.xpInfo = new Observable<XPInfo>({
      currentXP: 20,
      currentLevel: 0,
      maxLevel: 2,
    });
  });

  test("returns null when viewModel is not registered", () => {
    useBuilderMock([undefined, undefined]);
    const comp = render(
      <ExperiencePointsPanel gradingStyle={GradingStyle.point} />,
    );

    expect(comp.container).toBeEmptyDOMElement();
  });

  test("renders the current experience points", () => {
    useBuilderMock([viewModelMock, undefined]);
    const comp = render(
      <ExperiencePointsPanel gradingStyle={GradingStyle.point} />,
    );
    expect(comp.container).toHaveTextContent("20");
  });

  test("renders full experience if max level is reached", () => {
    viewModelMock.xpInfo.Value.currentLevel = 1;
    viewModelMock.xpInfo.Value.maxLevel = 1;
    useBuilderMock([viewModelMock, undefined]);
    const comp = render(
      <ExperiencePointsPanel gradingStyle={GradingStyle.point} />,
    );
    expect(comp.container).toHaveTextContent("100");
  });
});

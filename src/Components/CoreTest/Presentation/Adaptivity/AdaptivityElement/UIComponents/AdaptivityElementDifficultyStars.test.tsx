import { render } from "@testing-library/react";
import React from "react";
import AdaptivityElementDifficultyStars, {
  AdaptivityElementDifficultyStarState,
} from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/UIComponents/AdaptivityElementDifficultyStars";

describe("AdaptivityElementDifficultyStars", () => {
  test.each([
    AdaptivityElementDifficultyStarState.Empty,
    AdaptivityElementDifficultyStarState.RequiredSolved,
    AdaptivityElementDifficultyStarState.RequiredUnsolved,
    AdaptivityElementDifficultyStarState.RequiredTried,
    AdaptivityElementDifficultyStarState.NotRequiredSolved,
    AdaptivityElementDifficultyStarState.NotRequiredUnsolved,
    AdaptivityElementDifficultyStarState.NotRequiredTried,
  ])("should render with %p for each difficulty", (state) => {
    const { container } = render(
      <AdaptivityElementDifficultyStars
        easyState={state}
        mediumState={state}
        hardState={state}
        starClassName=""
      />
    );
    expect(container).toMatchSnapshot();
  });
});

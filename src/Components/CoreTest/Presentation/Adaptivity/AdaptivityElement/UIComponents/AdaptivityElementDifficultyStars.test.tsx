import { render, waitFor } from "@testing-library/react";
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
    Number.MAX_VALUE,
  ])("should render with %p for each difficulty", (state) => {
    const { container } = render(
      <AdaptivityElementDifficultyStars
        easyState={state}
        mediumState={state}
        hardState={state}
        starClassName=""
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test("should only render one star with withEmptySlots set to false and only easy set to required solved", () => {
    const { getAllByRole, getAllByTestId, getByTestId } = render(
      <AdaptivityElementDifficultyStars
        easyState={AdaptivityElementDifficultyStarState.RequiredSolved}
        mediumState={AdaptivityElementDifficultyStarState.Empty}
        hardState={AdaptivityElementDifficultyStarState.Empty}
        starClassName=""
        withEmptySlots={false}
      />,
    );

    waitFor(() => {
      expect(getAllByRole("img").length).toEqual(1);
    });
    expect(() => {
      getAllByTestId("empty-star-slot");
    }).toThrow("Unable to find an element");
  });
});

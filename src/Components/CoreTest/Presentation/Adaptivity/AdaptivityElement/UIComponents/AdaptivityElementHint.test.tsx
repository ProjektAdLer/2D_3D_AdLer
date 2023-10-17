import { render } from "@testing-library/react";
import React from "react";
import AdaptivityElementHint from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/UIComponents/AdaptivityElementHint";
import { AdaptivityElementActionTypes } from "../../../../../Core/Domain/Types/Adaptivity/AdaptivityElementActionTypes";

describe("AdaptivityElementHint", () => {
  test("should render", () => {
    const { container } = render(
      <AdaptivityElementHint
        hint={{
          hintID: 0,
          hintAction: {
            hintActionData: "testHintActionData",
            hintActionType: AdaptivityElementActionTypes.CommentAction,
          },
          showOnIsWrong: true,
        }}
        setHeaderText={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });
});

import { render } from "@testing-library/react";
import React from "react";
import AdaptivityElementHint from "../../../../../Core/Presentation/Adaptivity/AdaptivityElement/UIComponents/AdaptivityElementHint";
import { AdaptivityElementActionTypes } from "../../../../../Core/Domain/Types/Adaptivity/AdaptivityElementActionTypes";

describe("AdaptivityElementHint", () => {
  // ANF-ID: [EWE0004]
  test("should render CommentAction", () => {
    const { container } = render(
      <AdaptivityElementHint
        hint={{
          hintID: 0,
          hintAction: {
            hintActionType: AdaptivityElementActionTypes.CommentAction,
            textData: "test",
          },
          showOnIsWrong: true,
        }}
        setHeaderText={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test("should render ReferenceAction", () => {
    const { container } = render(
      <AdaptivityElementHint
        hint={{
          hintID: 0,
          hintAction: {
            hintActionType: AdaptivityElementActionTypes.ReferenceAction,
            textData: "test",
            idData: 0,
          },
          showOnIsWrong: true,
        }}
        setHeaderText={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });

  // ANF-ID: [EWE0044]
  test("should render ContentAction", () => {
    const { container } = render(
      <AdaptivityElementHint
        hint={{
          hintID: 0,
          hintAction: {
            hintActionType: AdaptivityElementActionTypes.ContentAction,
            textData: "test",
            idData: 0,
          },
          showOnIsWrong: true,
        }}
        setHeaderText={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });
});

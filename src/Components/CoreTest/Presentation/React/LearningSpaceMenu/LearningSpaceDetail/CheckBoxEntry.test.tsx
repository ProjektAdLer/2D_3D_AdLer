import { render } from "@testing-library/react";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import CheckBoxEntry from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceDetail/CheckBoxEntry";
import React from "react";

describe("Checkboxentry component in Space Menu", () => {
  test("should render", () => {
    useBuilderMock([undefined, undefined]);
    render(<CheckBoxEntry checked={true} children />);
  });
});

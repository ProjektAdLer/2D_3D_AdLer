import React from "react";
import { render } from "@testing-library/react";
import LoadingScreenHomePageInformation from "../../../../../../Core/Presentation/React/GeneralComponents/LoadingScreen/LoadingScreenContent/LoadingScreenHomePageInformation";

describe("LoadingScreenHomePageInformation", () => {
  test("should render", () => {
    const { container } = render(<LoadingScreenHomePageInformation />);
    expect(container).toMatchSnapshot();
  });
});

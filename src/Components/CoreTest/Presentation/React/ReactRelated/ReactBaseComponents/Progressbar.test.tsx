import { render } from "@testing-library/react";
import Progressbar from "../../../../../Core/Presentation/React/ReactRelated/ReactBaseComponents/Progressbar";

describe("Progressbar", () => {
  test("should render", () => {
    const componentUnderTest = render(<Progressbar value={1} max={10} />);
    expect(componentUnderTest.container).toMatchSnapshot();
  });
});

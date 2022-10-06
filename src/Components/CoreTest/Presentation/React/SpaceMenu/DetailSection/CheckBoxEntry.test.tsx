import { render } from "@testing-library/react";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import CheckBoxEntry from "~ReactComponents/SpaceMenu/DetailSection/CheckBoxEntry";

describe("Checkboxentry component in Space Menu", () => {
  test("should render", () => {
    useBuilderMock([undefined, undefined]);
    render(<CheckBoxEntry checked={true} text={"test"} />);
  });
});

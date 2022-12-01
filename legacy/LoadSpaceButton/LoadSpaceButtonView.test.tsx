import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import ILoadSpaceButtonController from "../../../../../Core/Presentation/React/GeneralComponents/LoadSpaceButton/ILoadSpaceButtonController";
import LoadSpaceButton from "../../../../../Core/Presentation/React/GeneralComponents/LoadSpaceButton/LoadSpaceButton";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

const fakeController = mock<ILoadSpaceButtonController>();

describe("LoadSpaceButtonView", () => {
  test("should render", () => {
    useBuilderMock([undefined, undefined]);
    render(<LoadSpaceButton />);
  });

  test("should call controller when clicked", () => {
    useBuilderMock([undefined, fakeController]);

    const componentUnderTest = render(<LoadSpaceButton />);

    fireEvent.click(componentUnderTest.getByRole("button"));
    expect(fakeController.loadWorld).toHaveBeenCalled();
  });
});

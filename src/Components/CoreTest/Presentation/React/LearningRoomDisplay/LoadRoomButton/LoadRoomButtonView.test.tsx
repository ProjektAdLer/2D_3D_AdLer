import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import ILoadRoomButtonController from "../../../../../Core/Presentation/React/LearningRoomDisplay/LoadRoomButton/ILoadRoomButtonController";
import LoadRoomButton from "../../../../../Core/Presentation/React/LearningRoomDisplay/LoadRoomButton/LoadRoomButton";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

const fakeController = mock<ILoadRoomButtonController>();

describe("LoadRoomButtonView", () => {
  test("should render", () => {
    useBuilderMock([undefined, undefined]);
    render(<LoadRoomButton />);
  });

  test("should call controller when clicked", () => {
    useBuilderMock([undefined, fakeController]);

    const componentUnderTest = render(<LoadRoomButton />);

    fireEvent.click(componentUnderTest.getByRole("button"));
    expect(fakeController.loadWorld).toHaveBeenCalled();
  });
});

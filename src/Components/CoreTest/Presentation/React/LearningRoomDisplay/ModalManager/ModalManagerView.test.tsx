import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import IModalManagerController from "../../../../../Core/Presentation/React/LearningRoomDisplay/ModalManager/IModalManagerController";
import ModalManager from "../../../../../Core/Presentation/React/LearningRoomDisplay/ModalManager/ModalManager";
import ModalManagerViewModel from "../../../../../Core/Presentation/React/LearningRoomDisplay/ModalManager/ModalManagerViewModel";
import "../../../../../Core/Types/array.extensions";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

let fakeModel = new ModalManagerViewModel();
const fakeController = mock<IModalManagerController>();

describe("ModalManager", () => {
  test("should render multible modals", () => {
    fakeModel.errors.Value = [
      {
        message: "test",
        type: "error",
      },
      {
        message: "test",
        type: "error",
      },
      {
        message: "test2",
        type: "notification",
      },
    ];
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<ModalManager />);

    expect(componentUnderTest.getByText("test2")).toBeInTheDocument();

    fireEvent.click(componentUnderTest.getByText("X"));

    expect(componentUnderTest.getByText("test")).toBeInTheDocument();
  });
});

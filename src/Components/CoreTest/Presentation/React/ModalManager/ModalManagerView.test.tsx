import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import IModalManagerController from "../../../../Core/Presentation/React/ModalManager/IModalManagerController";
import ModalManager from "../../../../Core/Presentation/React/ModalManager/ModalManager";
import ModalManagerViewModel from "../../../../Core/Presentation/React/ModalManager/ModalManagerViewModel";
import useViewModelControllerProviderMock from "../CustomHooks/UseViewModelControllerProvider/useViewModelControllerProviderMock";
import "../../../../Core/Types/array.extensions";

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
    useViewModelControllerProviderMock<
      ModalManagerViewModel,
      IModalManagerController
    >([[fakeModel], [fakeController]]);
    const componentUnderTest = render(<ModalManager />);

    expect(componentUnderTest.getByText("test2")).toBeInTheDocument();

    fireEvent.click(componentUnderTest.getByText("X"));

    expect(componentUnderTest.getByText("test")).toBeInTheDocument();
  });
});

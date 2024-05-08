import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import LearningElementModalController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalController";
import LearningElementModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import LearningElementModal from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModal";

let fakeModel = new LearningElementModalViewModel();
fakeModel.isOpen.Value = true;
fakeModel.id.Value = 123;
fakeModel.type.Value = "text";
fakeModel.parentWorldID.Value = 456;
fakeModel.isScoreable.Value = true;

const fakeController = mock<LearningElementModalController>();

jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/ImageComponent.tsx",
  () => () => <div>Hello World</div>
);

jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/H5PContent",
  () => () => <div>Hello World</div>
);

jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/VideoComponent.tsx",
  () => () => <div>Hello World</div>
);

jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/TextComponent.tsx",
  () => () => <div>Hello World</div>
);

describe("LearningElementModal", () => {
  test("doesn't render without controller", () => {
    useBuilderMock([fakeModel, undefined]);
    const { container } = render(<LearningElementModal />);
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, fakeController]);
    const { container } = render(<LearningElementModal />);
    expect(container.firstChild).toBeNull();
  });

  // ANF-ID: [EWE0038]
  test("should not render when closed", () => {
    fakeModel.isOpen.Value = false;

    useBuilderMock([fakeModel, fakeController]);

    const componentUnderTest = render(<LearningElementModal />);
    expect(componentUnderTest.container.childElementCount).toBe(0);

    fakeModel.isOpen.Value = true;
  });

  test("should render its content", () => {
    useBuilderMock([fakeModel, fakeController]);

    const componentUnderTest = render(<LearningElementModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  // ANF-ID: [EWE0037]
  test.each([["text"], ["image"], ["video"], ["h5p"]])(
    "should render its content with the correct type",
    (type) => {
      fakeModel.type.Value = type;

      useBuilderMock([fakeModel, fakeController]);

      const componentUnderTest = render(<LearningElementModal />);
      expect(componentUnderTest.container.childElementCount).toBe(1);
    }
  );

  test("should render error, if no element is selected", () => {
    fakeModel.type.Value = "type";
    useBuilderMock([fakeModel, fakeController]);

    const componentUnderTest = render(<LearningElementModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
    expect(
      componentUnderTest.getByText("No Element selected")
    ).toBeInTheDocument();
  });

  test("should call controller with element id when closed", () => {
    useBuilderMock([fakeModel, fakeController]);

    const componentUnderTest = render(<LearningElementModal />);
    fireEvent.click(componentUnderTest.getByRole("button"));

    expect(fakeController.scoreLearningElement).toHaveBeenCalledTimes(1);
  });
});

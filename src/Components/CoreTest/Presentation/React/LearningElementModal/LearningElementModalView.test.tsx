import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import H5PLearningElementData from "../../../../Core/Domain/Entities/SpecificLearningElements/H5PLearningElementData";
import LearningElementModal from "../../../../Core/Presentation/React/LearningElementModal/LearningElementModal";
import LearningElementModalController from "../../../../Core/Presentation/React/LearningElementModal/LearningElementModalController";
import LearningElementModalViewModel from "../../../../Core/Presentation/React/LearningElementModal/LearningElementModalViewModel";
import * as NewH5PContent from "../../../../Core/Presentation/React/LearningElementModal/SubComponents/NewH5PContent";
import useBuilderMock from "../CustomHooks/useBuilder/useBuilderMock";

let fakeModel = new LearningElementModalViewModel();
fakeModel.isOpen.Value = true;
fakeModel.id.Value = 123;
fakeModel.learningElementData.Value = {
  type: "text",
};

const fakeController = mock<LearningElementModalController>();

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

  test.each([["text"], ["image"], ["video"], ["h5p"]])(
    "should render its content with the correct type",
    (type) => {
      fakeModel.learningElementData.Value = {
        type,
      };

      if (type === "h5p") {
        fakeModel.learningElementData.Value = {
          type,
          contextId: 123,
          fileName: "test.h5p",
        } as H5PLearningElementData;
        jest.spyOn(NewH5PContent, "default").mockReturnValue(<div></div>);
      }

      useBuilderMock([fakeModel, fakeController]);

      const componentUnderTest = render(<LearningElementModal />);
      expect(componentUnderTest.container.childElementCount).toBe(1);
    }
  );

  test("should render error, if no element is selected", () => {
    fakeModel.learningElementData.Value = {
      type: "type",
    };
    useBuilderMock([fakeModel, fakeController]);

    const componentUnderTest = render(<LearningElementModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
    expect(
      componentUnderTest.getByText("No Learning Element selected")
    ).toBeInTheDocument();
  });

  test("should call controller with learning element id when closed", () => {
    useBuilderMock([fakeModel, fakeController]);

    const componentUnderTest = render(<LearningElementModal />);
    fireEvent.click(componentUnderTest.getByRole("button"));

    expect(fakeController.scoreLearningElement).toHaveBeenCalledWith(
      fakeModel.id.Value
    );
  });
});

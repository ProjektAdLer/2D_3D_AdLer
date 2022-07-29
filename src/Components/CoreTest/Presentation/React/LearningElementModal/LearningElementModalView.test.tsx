import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import H5PLearningElementData from "../../../../Core/Domain/Entities/SpecificLearningElements/H5PLearningElementData";
import LearningElementModal from "../../../../Core/Presentation/React/LearningElementModal/LearningElementModal";
import LearningElementModalController from "../../../../Core/Presentation/React/LearningElementModal/LearningElementModalController";
import LearningElementModalViewModel from "../../../../Core/Presentation/React/LearningElementModal/LearningElementModalViewModel";
import * as NewH5PContent from "../../../../Core/Presentation/React/LearningElementModal/SubComponents/NewH5PContent";
import useViewModelControllerProviderMock from "../CustomHooks/UseViewModelControllerProvider/useViewModelControllerProviderMock";

let fakeModel = new LearningElementModalViewModel();
fakeModel.isOpen.Value = true;
fakeModel.id.Value = 123;
fakeModel.learningElementData.Value = {
  type: "text",
};

const fakeController = mock<LearningElementModalController>();

describe("LearningElementModal", () => {
  test("should not render when closed", () => {
    useViewModelControllerProviderMock<
      LearningElementModalViewModel,
      LearningElementModalController
    >([[], []]);

    const componentUnderTest = render(<LearningElementModal />);
    expect(componentUnderTest.container.childElementCount).toBe(0);
  });

  test("should render its content", () => {
    useViewModelControllerProviderMock<
      LearningElementModalViewModel,
      LearningElementModalController
    >([[fakeModel], []]);

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

      useViewModelControllerProviderMock<
        LearningElementModalViewModel,
        LearningElementModalController
      >([[fakeModel], []]);

      const componentUnderTest = render(<LearningElementModal />);
      expect(componentUnderTest.container.childElementCount).toBe(1);
    }
  );

  test("should render error, if no element is selected", () => {
    fakeModel.learningElementData.Value = {
      type: "type",
    };
    useViewModelControllerProviderMock<
      LearningElementModalViewModel,
      LearningElementModalController
    >([[fakeModel], []]);

    const componentUnderTest = render(<LearningElementModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
    expect(
      componentUnderTest.getByText("No Learning Element selected")
    ).toBeInTheDocument();
  });

  test("should call controller with learning element id when closed", () => {
    useViewModelControllerProviderMock<
      LearningElementModalViewModel,
      LearningElementModalController
    >([[fakeModel], [fakeController]]);

    const componentUnderTest = render(<LearningElementModal />);
    fireEvent.click(componentUnderTest.getByRole("button"));

    expect(fakeController.scoreLearningElement).toHaveBeenCalledWith(
      fakeModel.id.Value
    );
  });
});

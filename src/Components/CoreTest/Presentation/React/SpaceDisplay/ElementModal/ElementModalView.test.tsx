import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import ElementModal from "../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/ElementModal";
import ElementModalController from "../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalController";
import ElementModalViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalViewModel";
import * as NewH5PContent from "../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/SubComponents/NewH5PContent";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

let fakeModel = new ElementModalViewModel();
fakeModel.isOpen.Value = true;
fakeModel.id.Value = 123;
fakeModel.type.Value = "text";

const fakeController = mock<ElementModalController>();

describe("ElementModal", () => {
  test("doesn't render without controller", () => {
    useBuilderMock([fakeModel, undefined]);
    const { container } = render(<ElementModal />);
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, fakeController]);
    const { container } = render(<ElementModal />);
    expect(container.firstChild).toBeNull();
  });

  test("should not render when closed", () => {
    fakeModel.isOpen.Value = false;

    useBuilderMock([fakeModel, fakeController]);

    const componentUnderTest = render(<ElementModal />);
    expect(componentUnderTest.container.childElementCount).toBe(0);

    fakeModel.isOpen.Value = true;
  });

  test("should render its content", () => {
    useBuilderMock([fakeModel, fakeController]);

    const componentUnderTest = render(<ElementModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  test.each([["text"], ["image"], ["video"], ["h5p"]])(
    "should render its content with the correct type",
    (type) => {
      fakeModel.type.Value = type;

      if (type === "h5p") {
        jest.spyOn(NewH5PContent, "default").mockReturnValue(<div></div>);
      }

      useBuilderMock([fakeModel, fakeController]);

      const componentUnderTest = render(<ElementModal />);
      expect(componentUnderTest.container.childElementCount).toBe(1);
    }
  );

  test("should render error, if no element is selected", () => {
    fakeModel.type.Value = "type";
    useBuilderMock([fakeModel, fakeController]);

    const componentUnderTest = render(<ElementModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
    expect(
      componentUnderTest.getByText("No Element selected")
    ).toBeInTheDocument();
  });

  test("should call controller with element id when closed", () => {
    useBuilderMock([fakeModel, fakeController]);

    const componentUnderTest = render(<ElementModal />);
    fireEvent.click(componentUnderTest.getByRole("button"));

    expect(fakeController.scoreElement).toHaveBeenCalledWith(
      fakeModel.id.Value
    );
  });
});

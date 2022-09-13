import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomDropdown from "../../../../../Core/Presentation/React/ReactRelated/ReactBaseComponents/CustomDropdown";

describe("Custom Dropdown", () => {
  it("should render", () => {
    const componentUnderTest = render(<CustomDropdown />);
    expect(componentUnderTest.baseElement).toBeInTheDocument();
  });

  it("Should render its children", () => {
    const componentUnderTest = render(
      <CustomDropdown isOpen={true} initialOpen={true}>
        <div>Test</div>
      </CustomDropdown>
    );
    expect(componentUnderTest.getByText("Test")).toBeInTheDocument();
  });

  it("should open when clicked", () => {
    const componentUnderTest = render(
      <CustomDropdown headerElement={"OpenElement"} useAsTriggerOnly={true}>
        <div>Test</div>
      </CustomDropdown>
    );
    fireEvent.click(componentUnderTest.getByText("OpenElement"));
    expect(componentUnderTest.getByText("Test")).toBeInTheDocument();
  });
});

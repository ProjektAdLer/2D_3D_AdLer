import { render } from "@testing-library/react";
import { ElementTypeStrings } from "src/Components/Core/Domain/Types/ElementTypes";
import DetailSection from "~ReactComponents/SpaceMenu/DetailSection/DetailSection";
import DetailSectionViewModel from "~ReactComponents/SpaceMenu/DetailSection/DetailSectionViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

describe("DetailSection in Space Menu", () => {
  test("should render", () => {
    useBuilderMock([new DetailSectionViewModel(), undefined]);
    const elements = [
      ["text" as ElementTypeStrings, "test"],
      ["image" as ElementTypeStrings, "test"],
    ];
    //TODO: elements has to be included in the detailsection
    render(<DetailSection />);
  });
});

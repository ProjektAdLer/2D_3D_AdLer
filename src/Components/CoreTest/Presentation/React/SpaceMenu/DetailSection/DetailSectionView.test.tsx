import { render } from "@testing-library/react";
import { ElementTypeStrings } from "src/Components/Core/Domain/Types/ElementTypes";
import Observable from "src/Lib/Observable";
import DetailSection from "~ReactComponents/SpaceMenu/DetailSection/DetailSection";
import DetailSectionController from "~ReactComponents/SpaceMenu/DetailSection/DetailSectionController";
import DetailSectionViewModel from "~ReactComponents/SpaceMenu/DetailSection/DetailSectionViewModel";
import IDetailSectionController from "~ReactComponents/SpaceMenu/DetailSection/IDetailSectionController";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

let mockViewmodel = new DetailSectionViewModel();
const mockElements: Observable<[ElementTypeStrings, string][]> = new Observable(
  [
    ["text" as ElementTypeStrings, "test"],
    ["image" as ElementTypeStrings, "test"],
  ]
);
const mockRequirements: Observable<[boolean, string][]> = new Observable([
  [true, "test"],
  [false, "test"],
]);
describe("DetailSection in Space Menu", () => {
  test("should render", () => {
    useBuilderMock([mockViewmodel, new DetailSectionController()]);
    mockViewmodel.elements = mockElements;
    mockViewmodel.requirements = mockRequirements;
    render(<DetailSection />);
  });
});

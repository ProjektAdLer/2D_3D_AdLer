import { render } from "@testing-library/react";
import DetailSection from "~ReactComponents/SpaceMenu/DetailSection/DetailSection";
import DetailSectionViewModel from "~ReactComponents/SpaceMenu/DetailSection/DetailSectionViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

describe("DetailSection in Room Menu", () => {
  test("should render", () => {
    useBuilderMock([new DetailSectionViewModel(), undefined]);
    render(<DetailSection />);
  });
});

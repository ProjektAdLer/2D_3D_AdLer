import { render } from "@testing-library/react";
import DetailSection from "~ReactComponents/RoomMenu/DetailSection/DetailSection";
import DetailSectionViewModel from "~ReactComponents/RoomMenu/DetailSection/DetailSectionViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

describe("LearningRoomDetail", () => {
  test("should render", () => {
    useBuilderMock([new DetailSectionViewModel(), undefined]);
    render(<DetailSection />);
  });
});

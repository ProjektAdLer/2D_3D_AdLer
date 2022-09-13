import { render } from "@testing-library/react";
import LearningRoomDetail from "~ReactComponents/LearningRoomMenu/LearningRoomDetail/LearningRoomDetail";
import LearningRoomDetailViewModel from "~ReactComponents/LearningRoomMenu/LearningRoomDetail/LearningRoomDetailViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

describe("LearningRoomDetail", () => {
  test("should render", () => {
    useBuilderMock([new LearningRoomDetailViewModel(), undefined]);
    render(<LearningRoomDetail />);
  });
});

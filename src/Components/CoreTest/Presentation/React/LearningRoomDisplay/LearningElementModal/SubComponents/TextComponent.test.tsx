import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TextComponent from "../../../../../../Core/Presentation/React/LearningRoomDisplay/LearningElementModal/SubComponents/TextComponent";

describe("TextLearningElementSubComponent", () => {
  test("should render its Text", () => {
    const text = "Hello World";
    const { getByText } = render(<TextComponent textContent={text} />);
    expect(getByText(text)).toBeInTheDocument();
  });
});

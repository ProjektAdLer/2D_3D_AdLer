import { mock } from "jest-mock-extended";
import AvatarEditorBodyCategory from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorCategories/AvatarEditorCategoryContents/AvatarEditorBodyCategory";
import AvatarEditorViewModel from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorViewModel";
import IAvatarEditorController from "../../../../../Core/Presentation/AvatarEditor/IAvatarEditorController";
import Observable from "../../../../../../Lib/Observable";
import { fireEvent, render } from "@testing-library/react";
import { AvatarColor } from "../../../../../Core/Domain/AvatarModels/AvatarColorPalette";
import React from "react";
import AvatarSkinColorPalette from "../../../../../Core/Domain/AvatarModels/AvatarSkinColorPalette";

const avatarEditorMock = mock<AvatarEditorViewModel>();
const avatarEditorControllerMock = mock<IAvatarEditorController>();

describe("AvatarEditorBodyCategory", () => {
  // ANF-ID: [EZZ0050]
  test("should render", () => {
    avatarEditorMock.skinColor = new Observable<AvatarColor>({
      id: 33,
      nameKey: "Brown 2",
      hexColor: "#4b2a1a",
    });

    const { container } = render(
      <AvatarEditorBodyCategory
        viewModel={avatarEditorMock}
        controller={avatarEditorControllerMock}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  // ANF-ID: [EZZ0050]
  test("click on colorpicker-button opens color picker", () => {
    const container = render(
      <AvatarEditorBodyCategory
        viewModel={avatarEditorMock}
        controller={avatarEditorControllerMock}
      />,
    );

    const colorpickerButton = container.getByText("Brown 2");
    fireEvent.click(colorpickerButton);

    expect(container.getAllByText("bodyColorTitle")[0]).toBeInTheDocument();
  });

  test("click on color in colorpicker calls controller", () => {
    avatarEditorMock.skinColor = new Observable<AvatarColor>(
      AvatarSkinColorPalette[4],
    );
    const container = render(
      <AvatarEditorBodyCategory
        viewModel={avatarEditorMock}
        controller={avatarEditorControllerMock}
      />,
    );

    const colorpickerButton = container.getByText("Light 1");
    fireEvent.click(colorpickerButton);

    const color = container.getByTestId("Light 1");
    fireEvent.click(color);

    expect(avatarEditorControllerMock.onAvatarConfigChanged).toHaveBeenCalled();
  });
});

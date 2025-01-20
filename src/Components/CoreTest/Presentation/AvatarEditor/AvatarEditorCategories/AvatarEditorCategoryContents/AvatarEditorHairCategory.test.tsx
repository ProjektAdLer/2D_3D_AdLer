import { fireEvent, render } from "@testing-library/react";
import AvatarEditorHairCategory from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorCategories/AvatarEditorCategoryContents/AvatarEditorHairCategory";
import React from "react";
import AvatarEditorViewModel, {
  AvatarEditorUI,
} from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorViewModel";
import IAvatarEditorController from "../../../../../Core/Presentation/AvatarEditor/IAvatarEditorController";
import { mock } from "jest-mock-extended";
import Observable from "../../../../../../Lib/Observable";
import {
  AvatarBeardModels,
  AvatarHairModels,
} from "../../../../../Core/Domain/AvatarModels/AvatarModelTypes";
import { AvatarColor } from "../../../../../Core/Domain/AvatarModels/AvatarColorPalette";

const avatarEditorMock = mock<AvatarEditorViewModel>();
const avatarEditorControllerMock = mock<IAvatarEditorController>();

describe("AvatarEditorHairCategory", () => {
  test("should render", () => {
    avatarEditorMock.uiVisiblity = {
      hairMenu: {
        hairstyles: new Observable<boolean>(true),
        beards: new Observable<boolean>(true),
      },
    } as AvatarEditorUI;

    avatarEditorMock.hair = new Observable<AvatarHairModels>("none");
    avatarEditorMock.beard = new Observable<AvatarBeardModels>("none");
    avatarEditorMock.hairColor = new Observable<AvatarColor>({
      id: 33,
      nameKey: "Brown 2",
      hexColor: "#4b2a1a",
    });

    const { container } = render(
      <AvatarEditorHairCategory
        viewModel={avatarEditorMock}
        controller={avatarEditorControllerMock}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test.each([
    ["hair", true, false],
    ["beard", false, true],
  ])(
    "click on tile in category %s calls controller",
    (category, hairUI, beardUI) => {
      avatarEditorMock.uiVisiblity = {
        hairMenu: {
          hairstyles: new Observable<boolean>(hairUI),
          beards: new Observable<boolean>(beardUI),
        },
      } as AvatarEditorUI;

      avatarEditorMock.hair = new Observable<AvatarHairModels>("none");
      avatarEditorMock.beard = new Observable<AvatarBeardModels>("none");
      avatarEditorMock.hairColor = new Observable<AvatarColor>({
        id: 33,
        nameKey: "Brown 2",
        hexColor: "#4b2a1a",
      });

      const container = render(
        <AvatarEditorHairCategory
          viewModel={avatarEditorMock}
          controller={avatarEditorControllerMock}
        />,
      );

      const tile = container.getByAltText("noneThumbnail");
      fireEvent.click(tile);

      expect(
        avatarEditorControllerMock.onAvatarConfigChanged,
      ).toHaveBeenCalled();
    },
  );

  test("click on colorpicker-button opens color picker", () => {
    avatarEditorMock.uiVisiblity = {
      hairMenu: {
        hairstyles: new Observable<boolean>(false),
        beards: new Observable<boolean>(false),
      },
    } as AvatarEditorUI;

    const container = render(
      <AvatarEditorHairCategory
        viewModel={avatarEditorMock}
        controller={avatarEditorControllerMock}
      />,
    );

    const colorpickerButton = container.getByText("Brown 2");
    fireEvent.click(colorpickerButton);

    expect(container.getByText("hairColorTitle")).toBeInTheDocument();
  });

  test("click on color in colorpicker calls controller", () => {
    avatarEditorMock.uiVisiblity = {
      hairMenu: {
        hairstyles: new Observable<boolean>(false),
        beards: new Observable<boolean>(false),
      },
    } as AvatarEditorUI;

    const container = render(
      <AvatarEditorHairCategory
        viewModel={avatarEditorMock}
        controller={avatarEditorControllerMock}
      />,
    );

    const colorpickerButton = container.getByText("Brown 2");
    fireEvent.click(colorpickerButton);

    const color = container.getByTestId("Brown 2");
    fireEvent.click(color);

    expect(avatarEditorControllerMock.onAvatarConfigChanged).toHaveBeenCalled();
  });
});

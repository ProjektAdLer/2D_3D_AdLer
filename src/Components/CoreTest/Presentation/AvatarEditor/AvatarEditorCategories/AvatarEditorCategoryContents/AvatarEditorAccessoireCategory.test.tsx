import { mock } from "jest-mock-extended";
import AvatarEditorViewModel, {
  AvatarEditorUI,
} from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorViewModel";
import IAvatarEditorController from "../../../../../Core/Presentation/AvatarEditor/IAvatarEditorController";
import Observable from "../../../../../../Lib/Observable";
import {
  AvatarBackpackModels,
  AvatarGlassesModels,
  AvatarHeadgearModels,
  AvatarOtherModels,
} from "../../../../../Core/Domain/AvatarModels/AvatarModelTypes";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import AvatarEditorAccessoireCategory from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorCategories/AvatarEditorCategoryContents/AvatarEditorAccessoireCategory";

const avatarEditorMock = mock<AvatarEditorViewModel>();
const avatarEditorControllerMock = mock<IAvatarEditorController>();

describe("AvatarEditorHairCategory", () => {
  // ANF-ID: [EZZ0041, EZZ0049, ELG0035, ELG0036]
  test("should render", () => {
    avatarEditorMock.uiVisiblity = {
      accessoireMenu: {
        headgear: new Observable<boolean>(true),
        glasses: new Observable<boolean>(true),
        backpack: new Observable<boolean>(true),
        other: new Observable<boolean>(true),
      },
    } as AvatarEditorUI;

    avatarEditorMock.headgear = new Observable<AvatarHeadgearModels>("none");
    avatarEditorMock.glasses = new Observable<AvatarGlassesModels>("none");
    avatarEditorMock.backpack = new Observable<AvatarBackpackModels>("none");
    avatarEditorMock.other = new Observable<AvatarOtherModels>("none");

    const { container } = render(
      <AvatarEditorAccessoireCategory
        viewModel={avatarEditorMock}
        controller={avatarEditorControllerMock}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  // ANF-ID: [EZZ0041, EZZ0049, ELG0035, ELG0036]
  test.each([
    ["headgear", true, false, false, false],
    ["glasses", false, true, false, false],
    ["backpack", false, false, true, false],
    ["other", false, false, false, true],
  ])(
    "click on tile in category %s calls controller",
    (category, headgearUI, glassesUI, backpackUI, otherUI) => {
      avatarEditorMock.uiVisiblity = {
        accessoireMenu: {
          headgear: new Observable<boolean>(headgearUI),
          glasses: new Observable<boolean>(glassesUI),
          backpack: new Observable<boolean>(backpackUI),
          other: new Observable<boolean>(otherUI),
        },
      } as AvatarEditorUI;

      avatarEditorMock.headgear = new Observable<AvatarHeadgearModels>("none");
      avatarEditorMock.glasses = new Observable<AvatarGlassesModels>("none");
      avatarEditorMock.backpack = new Observable<AvatarBackpackModels>("none");
      avatarEditorMock.other = new Observable<AvatarOtherModels>("none");

      const container = render(
        <AvatarEditorAccessoireCategory
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
  test("should not render if controller is undefined", () => {
    const container = render(
      <AvatarEditorAccessoireCategory
        viewModel={avatarEditorMock}
        controller={undefined!}
      />,
    );
    expect(container.container).toBeEmptyDOMElement();
  });
});

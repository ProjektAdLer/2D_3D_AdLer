import { mock } from "jest-mock-extended";
import AvatarEditorViewModel, {
  AvatarEditorUI,
} from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorViewModel";
import IAvatarEditorController from "../../../../../Core/Presentation/AvatarEditor/IAvatarEditorController";
import Observable from "../../../../../../Lib/Observable";
import {
  AvatarPantsModels,
  AvatarShirtModels,
  AvatarShoesModels,
} from "../../../../../Core/Domain/AvatarModels/AvatarModelTypes";
import { AvatarColor } from "../../../../../Core/Domain/AvatarModels/AvatarColorPalette";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import AvatarEditorClothingCategory from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorCategories/AvatarEditorCategoryContents/AvatarEditorClothingCategory";

const avatarEditorMock = mock<AvatarEditorViewModel>();
const avatarEditorControllerMock = mock<IAvatarEditorController>();

describe("AvatarEditorClothingCategory", () => {
  // ANF-ID: [EZZ0042, EZZ0043, EZZ0044, EZZ0045, EZZ0046, EZZ0047]
  test("should render", () => {
    avatarEditorMock.uiVisiblity = {
      clothingMenu: {
        shirts: new Observable<boolean>(true),
        pants: new Observable<boolean>(true),
        shoes: new Observable<boolean>(true),
      },
    } as AvatarEditorUI;

    avatarEditorMock.shirt = new Observable<AvatarShirtModels>("none" as any);
    avatarEditorMock.pants = new Observable<AvatarPantsModels>("none" as any);
    avatarEditorMock.shoes = new Observable<AvatarShoesModels>("none" as any);
    avatarEditorMock.shirtColor = new Observable<AvatarColor>({
      id: 33,
      nameKey: "Brown 2",
      hexColor: "#4b2a1a",
    });
    avatarEditorMock.pantsColor = new Observable<AvatarColor>({
      id: 33,
      nameKey: "Brown 2",
      hexColor: "#4b2a1a",
    });
    avatarEditorMock.shoesColor = new Observable<AvatarColor>({
      id: 33,
      nameKey: "Brown 2",
      hexColor: "#4b2a1a",
    });

    const { container } = render(
      <AvatarEditorClothingCategory
        viewModel={avatarEditorMock}
        controller={avatarEditorControllerMock}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  // ANF-ID: [EZZ0042, EZZ0043, EZZ0044]
  test.each([
    ["shirt", true, false, false, "shirts-topcoatsantaThumbnail"],
    ["pants", false, true, false, "pants-jeansThumbnail"],
    ["shoes", false, false, true, "shoes-bootsThumbnail"],
  ])(
    "click on tile in category %s calls controller",
    (category, shirtUI, pantsUI, shoesUi, thumbnailName) => {
      avatarEditorMock.uiVisiblity = {
        clothingMenu: {
          shirts: new Observable<boolean>(shirtUI),
          pants: new Observable<boolean>(pantsUI),
          shoes: new Observable<boolean>(shoesUi),
        },
      } as AvatarEditorUI;

      avatarEditorMock.shirt = new Observable<AvatarShirtModels>("none" as any);
      avatarEditorMock.pants = new Observable<AvatarPantsModels>("none" as any);
      avatarEditorMock.shoes = new Observable<AvatarShoesModels>("none" as any);
      avatarEditorMock.shirtColor = new Observable<AvatarColor>({
        id: 33,
        nameKey: "Brown 2",
        hexColor: "#4b2a1a",
      });
      avatarEditorMock.pantsColor = new Observable<AvatarColor>({
        id: 33,
        nameKey: "Brown 2",
        hexColor: "#4b2a1a",
      });
      avatarEditorMock.shoesColor = new Observable<AvatarColor>({
        id: 33,
        nameKey: "Brown 2",
        hexColor: "#4b2a1a",
      });

      const container = render(
        <AvatarEditorClothingCategory
          viewModel={avatarEditorMock}
          controller={avatarEditorControllerMock}
        />,
      );

      const tile = container.getByRole("button", { name: thumbnailName });
      fireEvent.click(tile);

      expect(
        avatarEditorControllerMock.onAvatarConfigChanged,
      ).toHaveBeenCalled();
    },
  );

  test.each([
    ["shirt", true, false, false],
    ["pants", false, true, false],
    ["shoes", false, false, true],
  ])(
    "colorpickerModal for %s functions correctly",
    (category, shirtUI, pantsUI, shoesUi) => {
      avatarEditorMock.uiVisiblity = {
        clothingMenu: {
          shirts: new Observable<boolean>(shirtUI),
          pants: new Observable<boolean>(pantsUI),
          shoes: new Observable<boolean>(shoesUi),
        },
      } as AvatarEditorUI;

      avatarEditorMock.shirt = new Observable<AvatarShirtModels>("none" as any);
      avatarEditorMock.pants = new Observable<AvatarPantsModels>("none" as any);
      avatarEditorMock.shoes = new Observable<AvatarShoesModels>("none" as any);
      avatarEditorMock.shirtColor = new Observable<AvatarColor>({
        id: 33,
        nameKey: "Brown 2",
        hexColor: "#4b2a1a",
      });
      avatarEditorMock.pantsColor = new Observable<AvatarColor>({
        id: 33,
        nameKey: "Brown 2",
        hexColor: "#4b2a1a",
      });
      avatarEditorMock.shoesColor = new Observable<AvatarColor>({
        id: 33,
        nameKey: "Brown 2",
        hexColor: "#4b2a1a",
      });

      const container = render(
        <AvatarEditorClothingCategory
          viewModel={avatarEditorMock}
          controller={avatarEditorControllerMock}
        />,
      );

      const colorpickerButton = container.getByText("Brown 2");
      fireEvent.click(colorpickerButton);

      //check if modal is open (multiple elements with brown)
      let brownElements = container.getAllByTestId(/Brown/i);

      expect(brownElements.length).toBeGreaterThan(1);

      const color = container.getByTestId("Brown 1");
      fireEvent.click(color);

      expect(
        avatarEditorControllerMock.onAvatarConfigChanged,
      ).toHaveBeenCalled();

      const closeButton = container.getByText("back");
      fireEvent.click(closeButton);

      let brownElementsAfterClose = container.queryAllByText(/Brown/i);
      expect(brownElementsAfterClose.length).toBe(1);
    },
  );
  test("doesn't render if controller is undefined", () => {
    const { container } = render(
      <AvatarEditorClothingCategory
        viewModel={avatarEditorMock}
        controller={undefined!}
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});

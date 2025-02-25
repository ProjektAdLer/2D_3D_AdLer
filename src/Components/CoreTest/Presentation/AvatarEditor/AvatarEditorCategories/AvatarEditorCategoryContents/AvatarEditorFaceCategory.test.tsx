import AvatarEditorViewModel, {
  AvatarEditorUI,
} from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorViewModel";
import { mock } from "jest-mock-extended";
import IAvatarEditorController from "../../../../../Core/Presentation/AvatarEditor/IAvatarEditorController";
import Observable from "../../../../../../Lib/Observable";
import { fireEvent, render } from "@testing-library/react";
import AvatarEditorFaceCategory from "../../../../../Core/Presentation/AvatarEditor/AvatarEditorCategories/AvatarEditorCategoryContents/AvatarEditorFaceCategory";
import React from "react";

const avatarEditorMock = mock<AvatarEditorViewModel>();
const avatarEditorControllerMock = mock<IAvatarEditorController>();

describe("AvatarEditorFaceCategory", () => {
  // ANF-ID: [EZZ0037, EZZ0038, EZZ0039, EZZ0040]
  test("should render", () => {
    avatarEditorMock.uiVisiblity = {
      faceMenu: {
        eyebrows: new Observable(true),
        eyes: new Observable(true),
        noses: new Observable(true),
        mouths: new Observable(true),
      },
    } as AvatarEditorUI;
    avatarEditorMock.eyebrows = new Observable<number>(0);
    avatarEditorMock.eyes = new Observable<number>(0);
    avatarEditorMock.nose = new Observable<number>(0);
    avatarEditorMock.mouth = new Observable<number>(0);

    const { container } = render(
      <AvatarEditorFaceCategory
        viewModel={avatarEditorMock}
        controller={avatarEditorControllerMock}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  // ANF-ID: [EZZ0037, EZZ0038, EZZ0039, EZZ0040]
  test.each([
    ["eyebrows", true, false, false, false, "Brows_1"],
    ["eyes", false, true, false, false, "Neural_Eyes_1"],
    ["nose", false, false, true, false, "Nose_1"],
    ["mouth", false, false, false, true, "Mouth_1"],
  ])(
    "click on tile in category %s calls controller",
    (category, eyebrowUI, eyeUI, noseUI, mouthUI, name) => {
      avatarEditorMock.uiVisiblity = {
        faceMenu: {
          eyebrows: new Observable(eyebrowUI),
          eyes: new Observable(eyeUI),
          noses: new Observable(noseUI),
          mouths: new Observable(mouthUI),
        },
      } as AvatarEditorUI;

      avatarEditorMock.eyebrows = new Observable(0);
      avatarEditorMock.eyes = new Observable(0);
      avatarEditorMock.nose = new Observable(0);
      avatarEditorMock.mouth = new Observable(0);

      const container = render(
        <AvatarEditorFaceCategory
          viewModel={avatarEditorMock}
          controller={avatarEditorControllerMock}
        />,
      );

      const tile = container.getByTestId(name);
      fireEvent.click(tile);
      expect(
        avatarEditorControllerMock.onAvatarConfigChanged,
      ).toHaveBeenCalled();
    },
  );
});

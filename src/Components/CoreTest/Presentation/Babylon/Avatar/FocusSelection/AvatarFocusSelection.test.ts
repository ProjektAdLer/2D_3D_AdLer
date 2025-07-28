import { mock, mockDeep } from "jest-mock-extended";
import AvatarFocusSelection from "../../../../../Core/Presentation/Babylon/Avatar/AvatarFocusSelection/AvatarFocusSelection";
import IAvatarPresenter from "../../../../../Core/Presentation/Babylon/Avatar/IAvatarPresenter";
import IAvatarFocusable, {
  FocusableTypes,
} from "../../../../../Core/Presentation/Babylon/Avatar/AvatarFocusSelection/IAvatarFocusable";
import IScenePresenter from "../../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import SCENE_TYPES from "../../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";
import { MeshBuilder, Vector3 } from "@babylonjs/core";
import AvatarPresenter from "../../../../../Core/Presentation/Babylon/Avatar/AvatarPresenter";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";

jest.mock("@babylonjs/core/Meshes/meshBuilder");

const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

describe("AvatarFocusSelection", () => {
  let systemUnderTest: AvatarFocusSelection;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock,
    );
  });

  beforeEach(() => {
    systemUnderTest = new AvatarFocusSelection();
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  test("registerAvatarPresenter sets the presenter member", () => {
    const mockPresenter = mock<IAvatarPresenter>();

    systemUnderTest.registerAvatarPresenter(mockPresenter);

    expect(systemUnderTest["avatarPresenter"]).toBe(mockPresenter);
  });

  test("registerFocusable adds focusable to list", () => {
    const focusable = mock<IAvatarFocusable>();

    systemUnderTest.registerFocusable(focusable);

    expect(systemUnderTest["focusables"]).toContain(focusable);
  });

  test("isInFocus returns true if focusable is in focus", () => {
    const focusable = mock<IAvatarFocusable>();
    systemUnderTest.registerFocusable(focusable);

    systemUnderTest.CurrentFocus.Value = focusable;

    expect(systemUnderTest.isInFocus(focusable)).toBe(true);
  });

  test("setupOnBeforeFirstFrame gets avatar position", () => {
    jest
      .spyOn(AvatarPresenter.prototype, "AvatarPosition", "get")
      .mockReturnValue(new Vector3(1, 2, 3));
    systemUnderTest.registerAvatarPresenter(new AvatarPresenter());

    systemUnderTest["setupOnBeforeFirstFrame"]();

    expect(systemUnderTest["lastUpdateAvatarPosition"]).toEqual(
      new Vector3(1, 2, 3),
    );

    jest.restoreAllMocks();
  });

  test("setupOnBeforeFirstFrame does not draw debug circles if config is not debug", () => {
    jest
      .spyOn(AvatarPresenter.prototype, "AvatarPosition", "get")
      .mockReturnValue(new Vector3(1, 2, 3));
    systemUnderTest.registerAvatarPresenter(new AvatarPresenter());

    systemUnderTest["setupOnBeforeFirstFrame"]();

    expect(MeshBuilder.CreateSphere).not.toHaveBeenCalled();

    jest.restoreAllMocks();
  });

  // ANF-ID: [EZZ0031]
  test("updateFocus sets closest focusable inside the interaction radius as current focus", () => {
    jest
      .spyOn(AvatarPresenter.prototype, "AvatarPosition", "get")
      .mockReturnValue(new Vector3(0, 0, 0));
    systemUnderTest.registerAvatarPresenter(new AvatarPresenter());

    const focusable1 = mock<IAvatarFocusable>();
    const focusable2 = mock<IAvatarFocusable>();
    const focusable3 = mock<IAvatarFocusable>();
    jest
      .spyOn(focusable1, "getFocusableCenterPosition")
      .mockReturnValue(
        new Vector3(
          0,
          0,
          Math.sqrt(systemUnderTest["squaredInteractionDistance"]) * 0.5,
        ),
      );
    jest
      .spyOn(focusable2, "getFocusableCenterPosition")
      .mockReturnValue(
        new Vector3(
          0,
          0,
          Math.sqrt(systemUnderTest["squaredInteractionDistance"]) * 0.99,
        ),
      );
    jest
      .spyOn(focusable3, "getFocusableCenterPosition")
      .mockReturnValue(
        new Vector3(
          0,
          0,
          Math.sqrt(systemUnderTest["squaredInteractionDistance"]) * 2,
        ),
      );
    systemUnderTest.registerFocusable(focusable1);
    systemUnderTest.registerFocusable(focusable2);
    systemUnderTest.registerFocusable(focusable3);

    systemUnderTest["updateFocus"]();

    expect(systemUnderTest.CurrentFocus.Value).toBe(focusable1);
  });

  test("updateFocus calls onUnfocused on previous focus", () => {
    jest
      .spyOn(AvatarPresenter.prototype, "AvatarPosition", "get")
      .mockReturnValue(new Vector3(0, 0, 0));
    systemUnderTest.registerAvatarPresenter(new AvatarPresenter());

    const focusable1 = mock<IAvatarFocusable>();
    const focusable2 = mock<IAvatarFocusable>();
    jest
      .spyOn(focusable1, "getFocusableCenterPosition")
      .mockReturnValue(
        new Vector3(
          0,
          0,
          Math.sqrt(systemUnderTest["squaredInteractionDistance"]) * 0.5,
        ),
      );
    jest
      .spyOn(focusable2, "getFocusableCenterPosition")
      .mockReturnValue(
        new Vector3(
          0,
          0,
          Math.sqrt(systemUnderTest["squaredInteractionDistance"]) * 0.99,
        ),
      );
    systemUnderTest.registerFocusable(focusable1);
    systemUnderTest.registerFocusable(focusable2);

    systemUnderTest.CurrentFocus.Value = focusable2;

    systemUnderTest["updateFocus"]();

    expect(focusable2.onUnfocused).toHaveBeenCalledTimes(1);
  });

  test("updateFocus calls onFocused on new focus", () => {
    jest
      .spyOn(AvatarPresenter.prototype, "AvatarPosition", "get")
      .mockReturnValue(new Vector3(0, 0, 0));
    systemUnderTest.registerAvatarPresenter(new AvatarPresenter());

    const focusable1 = mock<IAvatarFocusable>();
    const focusable2 = mock<IAvatarFocusable>();
    jest
      .spyOn(focusable1, "getFocusableCenterPosition")
      .mockReturnValue(
        new Vector3(
          0,
          0,
          Math.sqrt(systemUnderTest["squaredInteractionDistance"]) * 0.5,
        ),
      );
    jest
      .spyOn(focusable2, "getFocusableCenterPosition")
      .mockReturnValue(
        new Vector3(
          0,
          0,
          Math.sqrt(systemUnderTest["squaredInteractionDistance"]) * 0.99,
        ),
      );
    systemUnderTest.registerFocusable(focusable1);
    systemUnderTest.registerFocusable(focusable2);

    systemUnderTest["updateFocus"]();

    expect(focusable1.onFocused).toHaveBeenCalledTimes(1);
  });

  test("updateFocus doesn't update focus if avatar hasn't moved less than set threshold since the last update", () => {
    jest
      .spyOn(AvatarPresenter.prototype, "AvatarPosition", "get")
      .mockReturnValue(new Vector3(0, 0, 0));
    systemUnderTest.registerAvatarPresenter(new AvatarPresenter());
    systemUnderTest["lastUpdateAvatarPosition"] = new Vector3(
      0,
      0,
      Math.sqrt(systemUnderTest["squaredAvatarMovementThreshold"]) * 0.9, // non-zero distance below threshold
    );

    const focusable = mock<IAvatarFocusable>();
    systemUnderTest.registerFocusable(focusable);

    systemUnderTest["updateFocus"]();

    expect(systemUnderTest.CurrentFocus.Value).toBeNull();
  });

  test("cleanup removes updateFocus from onBeforeRenderObservable", () => {
    systemUnderTest["cleanup"]();

    expect(
      scenePresenterMock.Scene.onBeforeRenderObservable.removeCallback,
    ).toHaveBeenCalledWith(systemUnderTest["updateFocus"]);
  });

  test("cleanup clears focusables and avatarPresenter", () => {
    systemUnderTest["cleanup"]();

    expect(systemUnderTest["focusables"]).toEqual([]);
    expect(systemUnderTest["avatarPresenter"]).toBeNull();
  });

  test("cleanup binds fresh AvatarFocusSelection instance to DI container", () => {
    systemUnderTest["cleanup"]();

    const freshInstance = CoreDIContainer.get(
      PRESENTATION_TYPES.IAvatarFocusSelection,
    );

    expect(freshInstance).not.toBe(systemUnderTest);
  });

  test("setSpecialFocus sets specialFocus to true if corresponding id exists", () => {
    systemUnderTest["specialFocus"] = false;
    const focusable = mock<IAvatarFocusable>();
    jest.spyOn(focusable, "getID").mockReturnValue({
      id: 42,
      type: FocusableTypes.learningElement,
    });

    systemUnderTest.registerFocusable(focusable);

    systemUnderTest["setSpecialFocus"](42, FocusableTypes.learningElement);
    expect(systemUnderTest["specialFocus"]).toBe(true);
  });

  test("setSpecialFocus sets specialFocus to false if no corresponding id exists", () => {
    systemUnderTest["specialFocus"] = true;
    const focusable = mock<IAvatarFocusable>();
    jest.spyOn(focusable, "getID").mockReturnValue({
      id: 42,
      type: FocusableTypes.learningElement,
    });

    systemUnderTest.registerFocusable(focusable);

    systemUnderTest["setSpecialFocus"](undefined, undefined);
    expect(systemUnderTest["specialFocus"]).toBe(false);
  });

  test("hasSpecialFocus return specialFocus", () => {
    systemUnderTest["specialFocus"] = true;
    expect(systemUnderTest.hasSpecialFocus()).toBe(true);
    systemUnderTest["specialFocus"] = false;
    expect(systemUnderTest.hasSpecialFocus()).toBe(false);
  });
});

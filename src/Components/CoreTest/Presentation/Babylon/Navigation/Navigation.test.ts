import mock from "jest-mock-extended/lib/Mock";
import SimpleEvent from "../../../../../Lib/SimpleEvent";
import Navigation from "../../../../Core/Presentation/Babylon/Navigation/Navigation";
import NavigationConfiguration from "../../../../Core/Presentation/Babylon/Navigation/NavigationConfiguration";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import { RecastJSPlugin } from "@babylonjs/core";

const notifySubscribersMock = jest.spyOn(
  SimpleEvent.prototype,
  "notifySubscribers"
);

jest.mock("@babylonjs/core");
jest.mock("recast-detour");

const scenePresenterMock = mock<IScenePresenter>();

describe("Navigation", () => {
  let systemUnderTest: Navigation;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IScenePresenter>(
      CORE_TYPES.IScenePresenter
    ).toConstantValue(scenePresenterMock);
  });

  beforeEach(() => {
    systemUnderTest = new Navigation(
      scenePresenterMock,
      new NavigationConfiguration()
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test.skip("createNavigationMesh creates a navigation mesh", () => {
    let mesh = systemUnderTest.setupNavigation();
  });

  test.skip("Plugin getter returns plugin", () => {
    systemUnderTest.setupNavigation();

    expect(systemUnderTest.Plugin).toBeInstanceOf(RecastJSPlugin);
  });
});

import SimpleEvent from "../../../../../Lib/SimpleEvent";
import Navigation from "../../../../Core/Presentation/Babylon/Navigation/Navigation";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import { ICrowd, Mesh, RecastJSPlugin } from "@babylonjs/core";
import { config } from "../../../../../config";
import { mock, mockDeep } from "jest-mock-extended";
import SCENE_TYPES from "../../../../Core/DependencyInjection/Scenes/SCENE_TYPES";

jest.mock("@babylonjs/core");
jest.mock("../../../../../Lib/SimpleEvent");

const scenePresenterMock = mockDeep<IScenePresenter>();
const scenePresenterFactoryMock = () => scenePresenterMock;

describe("Navigation", () => {
  let systemUnderTest: Navigation;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(SCENE_TYPES.ScenePresenterFactory).toConstantValue(
      scenePresenterFactoryMock
    );
  });

  beforeEach(() => {
    CoreDIContainer.snapshot();
    systemUnderTest = CoreDIContainer.resolve(Navigation);
    CoreDIContainer.restore();

    jest.resetAllMocks();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("Plugin getter", () => {
    let pluginMock = mock<RecastJSPlugin>();
    systemUnderTest["plugin"] = pluginMock;

    expect(systemUnderTest.Plugin).toBe(pluginMock);
  });

  test("Crowd getter", () => {
    let crowdMock = mock<ICrowd>();
    systemUnderTest["crowd"] = crowdMock;

    expect(systemUnderTest.Crowd).toBe(crowdMock);
  });

  test("setupNavigation warns when its called twice", async () => {
    // ensure that debug code isn't executed
    config.isDebug = false;

    await systemUnderTest.setupNavigation();

    try {
      await systemUnderTest.setupNavigation();
    } catch (e) {
      expect(e.message).toBe("Repeated call to setupNavigation");
    }
  });

  test("setupNavigation creates a NavMesh and Crowd with the Recast plugin", async () => {
    // ensure that debug code isn't executed
    config.isDebug = false;

    await systemUnderTest.setupNavigation();

    expect(RecastJSPlugin.prototype.createNavMesh).toHaveBeenCalledTimes(1);
    expect(RecastJSPlugin.prototype.createCrowd).toHaveBeenCalledTimes(1);
  });

  test("setupNavigation calls notifySubscribers on the onNavigationReadyObservable event", async () => {
    // ensure that debug code isn't executed
    config.isDebug = false;

    await systemUnderTest.setupNavigation();

    expect(SimpleEvent.prototype.notifySubscribers).toHaveBeenCalledTimes(1);
  });

  test("setupNavigation creates a debug NavMesh when config.isDebug is true", async () => {
    RecastJSPlugin.prototype.createDebugNavMesh = jest
      .fn()
      .mockReturnValue(mock<Mesh>());

    // ensure that debug code is executed
    config.isDebug = true;

    await systemUnderTest.setupNavigation();

    expect(RecastJSPlugin.prototype.createDebugNavMesh).toHaveBeenCalledTimes(
      1
    );
  });
});

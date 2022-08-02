import { mock } from "jest-mock-extended";
import { config } from "../../../../../config";
import IDebugUseCase from "../../../../Core/Application/DebugUseCase/IDebugUseCase";
import BUILDER_TYPES from "../../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IPresentationDirector from "../../../../Core/Presentation/PresentationBuilder/IPresentationDirector";

import ReactEntry from "../../../../Core/Presentation/React/ReactEntryPoint/ReactEntry";

const directorMock = mock<IPresentationDirector>();
const debugUseCaseMock = mock<IDebugUseCase>();

jest.mock(
  "../../../../Core/Presentation/React/ReactEntryPoint/App",
  () => () => <div>App</div>
);

describe("ReactEntry", () => {
  let systemUnderTest: ReactEntry;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    ).toConstantValue(directorMock);

    CoreDIContainer.rebind<IDebugUseCase>(
      USECASE_TYPES.IDebugUseCase
    ).toConstantValue(debugUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = new ReactEntry();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("setupReact", () => {
    // disable console.error
    const originalError = console.error;
    console.error = jest.fn();

    const container = document.createElement("div");
    container.setAttribute("id", "root");
    document.body.appendChild(container);
    systemUnderTest.setupReact();
    // restore console.error
    console.error = originalError;
  });

  test("should build all view models", () => {
    systemUnderTest["buildViewModels"]();
    expect(directorMock.build).toHaveBeenCalledTimes(7);
  });

  test("should call the debug usecase if in  debug mode", () => {
    const oldconfig = config;

    config.autoLoginWithoutShortcut = true;
    config.nodeEnv = "development";
    config.isDebug = true;

    systemUnderTest["startDebugUseCase"]();

    config.autoLoginWithoutShortcut = oldconfig.autoLoginWithoutShortcut;
    config.nodeEnv = oldconfig.nodeEnv;
    config.isDebug = oldconfig.isDebug;
  });
});

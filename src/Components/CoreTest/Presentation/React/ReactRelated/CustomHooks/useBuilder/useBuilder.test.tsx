import { renderHook } from "@testing-library/react";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import FullscreenSwitchController from "~ReactComponents/SpaceDisplay/FullscreenSwitch/FullscreenSwitchController";
import FullscreenSwitchViewModel from "~ReactComponents/SpaceDisplay/FullscreenSwitch/FullscreenSwitchViewModel";
import * as useInjection from "inversify-react";
import FullscreenSwitchBuilder from "~ReactComponents/SpaceDisplay/FullscreenSwitch/FullscreenSwitchBuilder";
import { act } from "react-dom/test-utils";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import { mock } from "jest-mock-extended";
import PresentationDirector from "src/Components/Core/Presentation/PresentationBuilder/PresentationDirector";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "src/Components/Core/Presentation/ViewModelProvider/ViewModelControllerProvider";

describe("useBuilderHook", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();

    CoreDIContainer.bind(BUILDER_TYPES.IPresentationDirector).to(
      PresentationDirector
    );

    CoreDIContainer.bind(BUILDER_TYPES.IFullscreenSwitchBuilder).to(
      FullscreenSwitchBuilder
    );

    CoreDIContainer.bind(CORE_TYPES.IViewModelControllerProvider).to(
      ViewModelControllerProvider
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });
  test("should return controller and viewModel", () => {
    const wrapper = ({ children }: { children: any }) => (
      <useInjection.Provider container={CoreDIContainer}>
        {children}
      </useInjection.Provider>
    );
    const { result } = renderHook(
      () => useBuilder(BUILDER_TYPES.IFullscreenSwitchBuilder),
      { wrapper }
    );

    expect(result.current[0]).toBeInstanceOf(FullscreenSwitchViewModel);
    expect(result.current[1]).toBeInstanceOf(FullscreenSwitchController);
  });
});

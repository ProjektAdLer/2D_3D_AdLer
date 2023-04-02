import { renderHook } from "@testing-library/react";
import BUILDER_TYPES from "../../../../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../../Core/DependencyInjection/CoreTypes";
import useBuilder from "../../../../../../Core/Presentation/React/ReactRelated/CustomHooks/useBuilder";
import FullscreenSwitchController from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/FullscreenSwitch/FullscreenSwitchController";
import FullscreenSwitchViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/FullscreenSwitch/FullscreenSwitchViewModel";
import FullscreenSwitchBuilder from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/FullscreenSwitch/FullscreenSwitchBuilder";
import PresentationDirector from "../../../../../../Core/Presentation/PresentationBuilder/PresentationDirector";
import ViewModelControllerProvider from "../../../../../../Core/Presentation/ViewModelProvider/ViewModelControllerProvider";
import * as useInjection from "inversify-react";
import React from "react";

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

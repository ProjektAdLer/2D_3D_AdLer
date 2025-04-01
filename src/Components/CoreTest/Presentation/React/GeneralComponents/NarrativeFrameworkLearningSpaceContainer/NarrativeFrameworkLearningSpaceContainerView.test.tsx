import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IGetNarrativeFrameworkInfoUseCase from "../../../../../Core/Application/UseCases/GetNarrativeFrameworkInfo/IGetNarrativeFrameworkInfoUseCase";
import INarrativeFrameworkLearningSpaceContainerController from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLearningSpaceContainer/INarrativeFrameworkLearningSpaceContainerController";
import NarrativeFrameworkLearningSpaceContainerViewModel from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLearningSpaceContainer/NarrativeFrameworkLearningSpaceContainerViewModel";
import { render } from "@testing-library/react";
import { Provider } from "inversify-react";
import React from "react";
import NarrativeFrameworkLearningSpaceContainer from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLearningSpaceContainer/NarrativeFrameworkLearningSpaceContainer";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

let mockViewModel = new NarrativeFrameworkLearningSpaceContainerViewModel();
let mockController =
  mock<INarrativeFrameworkLearningSpaceContainerController>();
let mockUseCase = mock<IGetNarrativeFrameworkInfoUseCase>();

describe("NarrativeFrameworkLearningSpaceContainerView", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetNarrativeFrameworkInfoUseCase,
    ).toConstantValue(mockUseCase);
  });
  afterAll(() => {
    CoreDIContainer.restore();
  });
  test("should render", () => {
    render(
      <Provider container={CoreDIContainer}>
        <NarrativeFrameworkLearningSpaceContainer />
      </Provider>,
    );
  });

  test("should not render if viewmodel is undefined", () => {
    useBuilderMock([undefined, mockController]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFrameworkLearningSpaceContainer />
      </Provider>,
    );

    expect(container.container).toBeEmptyDOMElement();
  });
  test("should not render if controller is undefined", () => {
    useBuilderMock([mockViewModel, undefined]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFrameworkLearningSpaceContainer />
      </Provider>,
    );

    expect(container.container).toBeEmptyDOMElement();
  });
  test("should not render if isOpen is false", () => {
    mockViewModel.isOpen = false;
    useBuilderMock([mockViewModel, mockController]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFrameworkLearningSpaceContainer />
      </Provider>,
    );

    expect(container.container).toBeEmptyDOMElement();
  });
});

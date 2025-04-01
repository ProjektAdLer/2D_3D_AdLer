import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IGetNarrativeFrameworkInfoUseCase from "../../../../../Core/Application/UseCases/GetNarrativeFrameworkInfo/IGetNarrativeFrameworkInfoUseCase";
import INarrativeFrameworkLoadingScreenContainerController from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLoadingScreenContainer/INarrativeFrameworkLoadingScreenContainerController";
import NarrativeFrameworkLoadingScreenContainerViewModel from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLoadingScreenContainer/NarrativeFrameworkLoadingScreenContainerViewModel";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "inversify-react";
import React from "react";
import NarrativeFrameworkLoadingScreenContainer from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLoadingScreenContainer/NarrativeFrameworkLoadingScreenContainer";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

let mockViewModel = new NarrativeFrameworkLoadingScreenContainerViewModel();
let mockController =
  mock<INarrativeFrameworkLoadingScreenContainerController>();
let mockUseCase = mock<IGetNarrativeFrameworkInfoUseCase>();

describe("NarrativeFrameworkLoadingScreenContainerView", () => {
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
    useBuilderMock([mockViewModel, mockController]);
    mockViewModel.isShowingContent.Value = true;
    render(
      <Provider container={CoreDIContainer}>
        <NarrativeFrameworkLoadingScreenContainer />
      </Provider>,
    );
  });

  test("should not render if viewmodel is undefined", () => {
    useBuilderMock([undefined, mockController]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFrameworkLoadingScreenContainer />
      </Provider>,
    );

    expect(container.container).toBeEmptyDOMElement();
  });

  test("should not render if controller is undefined", () => {
    useBuilderMock([mockViewModel, undefined]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFrameworkLoadingScreenContainer />
      </Provider>,
    );

    expect(container.container).toBeEmptyDOMElement();
  });
});

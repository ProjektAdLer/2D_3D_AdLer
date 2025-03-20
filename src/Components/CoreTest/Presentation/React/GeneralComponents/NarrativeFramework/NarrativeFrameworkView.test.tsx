import React from "react";
import { render } from "@testing-library/react";
import NarrativeFramework from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFramework/NarrativeFramework";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import NarrativeFrameworkViewModel from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFramework/NarrativeFrameworkViewModel";
import { mock } from "jest-mock-extended";
import INarrativeFrameworkController from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFramework/INarrativeFrameworkController";
import IGetNarrativeFrameworkInfoUseCase from "../../../../../Core/Application/UseCases/GetNarrativeFrameworkInfo/IGetNarrativeFrameworkInfoUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

let mockViewModel = new NarrativeFrameworkViewModel();
let mockController = mock<INarrativeFrameworkController>();
let mockUseCase = mock<IGetNarrativeFrameworkInfoUseCase>();

describe("NarrativeFrameworkView", () => {
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
        <NarrativeFramework />
      </Provider>,
    );
  });

  test("should not render if introtext and outrotext is undefined", () => {
    mockViewModel.introText = undefined;
    mockViewModel.outroText = undefined;
    mockViewModel.isOpen.Value = true;
    useBuilderMock([mockViewModel, mockController]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFramework />
      </Provider>,
    );

    expect(container.container).toBeEmptyDOMElement();
  });
});

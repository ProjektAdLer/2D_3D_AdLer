import React from "react";
import { render } from "@testing-library/react";
import NarrativeFrameworkIntro from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkIntro/NarrativeFrameworkIntro";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import NarrativeFrameworkIntroViewModel from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkIntro/NarrativeFrameworkIntroViewModel";
import { mock } from "jest-mock-extended";
import INarrativeFrameworkIntroController from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkIntro/INarrativeFrameworkIntroController";
import IGetNarrativeFrameworkInfoUseCase from "../../../../../Core/Application/UseCases/GetNarrativeFrameworkInfo/IGetNarrativeFrameworkInfoUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

let mockViewModel = new NarrativeFrameworkIntroViewModel();
let mockController = mock<INarrativeFrameworkIntroController>();
let mockUseCase = mock<IGetNarrativeFrameworkInfoUseCase>();

describe("NarrativeFrameworkIntroView", () => {
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
        <NarrativeFrameworkIntro />
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
        <NarrativeFrameworkIntro />
      </Provider>,
    );

    expect(container.container).toBeEmptyDOMElement();
  });
});

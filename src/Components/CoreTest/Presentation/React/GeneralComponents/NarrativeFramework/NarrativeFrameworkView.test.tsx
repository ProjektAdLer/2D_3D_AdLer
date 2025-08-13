import React from "react";
import { fireEvent, render } from "@testing-library/react";
import NarrativeFramework from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFramework/NarrativeFramework";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import NarrativeFrameworkViewModel from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFramework/NarrativeFrameworkViewModel";
import { mock } from "jest-mock-extended";
import INarrativeFrameworkController from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFramework/INarrativeFrameworkController";
import IGetNarrativeFrameworkInfoUseCase from "../../../../../Core/Application/UseCases/GetNarrativeFrameworkInfo/IGetNarrativeFrameworkInfoUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import { ThemeType } from "../../../../../Core/Domain/Types/ThemeTypes";

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

  //ANF-ID: [ELG0037]
  test("should render if type intro", () => {
    mockViewModel.introText = "blah";
    useBuilderMock([mockViewModel, mockController]);
    render(
      <Provider container={CoreDIContainer}>
        <NarrativeFramework type="intro" />
      </Provider>,
    );
  });
  //ANF-ID: [ELG0038]
  test("should render if type outro", () => {
    mockViewModel.outroText = "blah";
    useBuilderMock([mockViewModel, mockController]);
    render(
      <Provider container={CoreDIContainer}>
        <NarrativeFramework type="outro" />
      </Provider>,
    );
  });

  test("should not render if viewmodel is undefined", () => {
    useBuilderMock([undefined, mockController]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFramework type="intro" />
      </Provider>,
    );

    expect(container.container).toBeEmptyDOMElement();
  });

  test("should not render if controller is undefined", () => {
    useBuilderMock([mockViewModel, undefined]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFramework type="intro" />
      </Provider>,
    );

    expect(container.container).toBeEmptyDOMElement();
  });

  test("should not render if type = intro, yet introText is undefined", () => {
    mockViewModel.introText = undefined;
    useBuilderMock([mockViewModel, mockController]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFramework type="intro" />
      </Provider>,
    );

    expect(container.container).toBeEmptyDOMElement();
  });

  test("should not render if type = outro, yet outroText is undefined", () => {
    mockViewModel.outroText = undefined;
    useBuilderMock([mockViewModel, mockController]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFramework type="outro" />
      </Provider>,
    );

    expect(container.container).toBeEmptyDOMElement();
  });

  // Tests for theme-based background images
  test("should render CampusAB background image when theme is CampusAB", () => {
    mockViewModel.introText = "test intro";
    mockViewModel.theme = ThemeType.CampusAB;
    useBuilderMock([mockViewModel, mockController]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFramework type="intro" />
      </Provider>,
    );

    const backgroundDiv = container.container.querySelector(
      'div[style*="background-image"]',
    );
    expect(backgroundDiv?.getAttribute("style")).toContain(
      "a-background-narrativeframework-campusab.png",
    );
  });

  test("should render CampusKE background image when theme is CampusKE", () => {
    mockViewModel.introText = "test intro";
    mockViewModel.theme = ThemeType.CampusKE;
    useBuilderMock([mockViewModel, mockController]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFramework type="intro" />
      </Provider>,
    );

    const backgroundDiv = container.container.querySelector(
      'div[style*="background-image"]',
    );
    expect(backgroundDiv?.getAttribute("style")).toContain(
      "a-background-narrativeframework-campuske.png",
    );
  });

  test("should render Suburb background image when theme is Suburb", () => {
    mockViewModel.introText = "test intro";
    mockViewModel.theme = ThemeType.Suburb;
    useBuilderMock([mockViewModel, mockController]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFramework type="intro" />
      </Provider>,
    );

    const backgroundDiv = container.container.querySelector(
      'div[style*="background-image"]',
    );
    expect(backgroundDiv?.getAttribute("style")).toContain(
      "a-background-narrativeframework-suburb.png",
    );
  });

  test("should render Company background image when theme is Company", () => {
    mockViewModel.introText = "test intro";
    mockViewModel.theme = ThemeType.Company;
    useBuilderMock([mockViewModel, mockController]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFramework type="intro" />
      </Provider>,
    );

    const backgroundDiv = container.container.querySelector(
      'div[style*="background-image"]',
    );
    expect(backgroundDiv?.getAttribute("style")).toContain(
      "a-background-narrativeframework-company.png",
    );
  });

  test("should render Suburb background image as fallback when theme is undefined", () => {
    mockViewModel.introText = "test intro";
    mockViewModel.theme = undefined as any;
    useBuilderMock([mockViewModel, mockController]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFramework type="intro" />
      </Provider>,
    );

    const backgroundDiv = container.container.querySelector(
      'div[style*="background-image"]',
    );
    expect(backgroundDiv?.getAttribute("style")).toContain(
      "a-background-narrativeframework-suburb.png",
    );
  });

  test("should render AdLer image regardless of theme", () => {
    mockViewModel.introText = "test intro";
    mockViewModel.theme = ThemeType.CampusAB;
    useBuilderMock([mockViewModel, mockController]);

    const container = render(
      <Provider container={CoreDIContainer}>
        <NarrativeFramework type="intro" />
      </Provider>,
    );

    const adlerImg = container.container.querySelector(
      'img[alt="AdLer with a thumb up"]',
    );
    expect(adlerImg).toBeTruthy();
    expect(adlerImg?.getAttribute("src")).toContain(
      "g-narrativeframe-explainadler-angled.png",
    );
  });
});

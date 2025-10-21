import BadgeOverviewModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BadgeOverviewModal/BadgeOverviewModalViewModel";
import BadgeOverviewModal from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BadgeOverviewModal/BadgeOverviewModal";
import "@testing-library/jest-dom";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { ThemeType } from "../../../../../Core/Domain/Types/ThemeTypes";

describe("BadgeOverviewModal", () => {
  let fakeModel: BadgeOverviewModalViewModel;

  beforeEach(() => {
    fakeModel = new BadgeOverviewModalViewModel();
    useBuilderMock([fakeModel, undefined]);
  });
  test("should render when open", () => {
    fakeModel.isOpen.Value = true;
    fakeModel.currentLevel.Value = 20;
    fakeModel.language = "de";

    useBuilderMock([fakeModel, undefined]);

    const componentUnderTest = render(<BadgeOverviewModal />);

    expect(componentUnderTest).toMatchSnapshot();
  });
  test("doesn't render if viewmodel is undefined", () => {
    useBuilderMock([undefined, undefined]);

    const componentUnderTest = render(<BadgeOverviewModal />);

    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });

  test("should render when ThemeType is CampusAB", () => {
    fakeModel.isOpen.Value = true;
    fakeModel.currentLevel.Value = 20;
    fakeModel.worldTheme = ThemeType.CampusAB;

    useBuilderMock([fakeModel, undefined]);

    const componentUnderTest = render(<BadgeOverviewModal />);

    expect(componentUnderTest).toMatchSnapshot();
  });
  test("should render when ThemeType is Suburb", () => {
    fakeModel.isOpen.Value = true;
    fakeModel.currentLevel.Value = 20;
    fakeModel.worldTheme = ThemeType.Suburb;

    useBuilderMock([fakeModel, undefined]);

    const componentUnderTest = render(<BadgeOverviewModal />);

    expect(componentUnderTest).toMatchSnapshot();
  });
  test("should render when ThemeType is Company", () => {
    fakeModel.isOpen.Value = true;
    fakeModel.currentLevel.Value = 20;
    fakeModel.worldTheme = ThemeType.Company;

    useBuilderMock([fakeModel, undefined]);

    const componentUnderTest = render(<BadgeOverviewModal />);

    expect(componentUnderTest).toMatchSnapshot();
  });
  test("should render when ThemeType is something unexpected", () => {
    fakeModel.isOpen.Value = true;
    fakeModel.currentLevel.Value = 20;
    fakeModel.worldTheme = "UNEXPECTED" as ThemeType;

    useBuilderMock([fakeModel, undefined]);

    const componentUnderTest = render(<BadgeOverviewModal />);

    expect(componentUnderTest).toMatchSnapshot();
  });
  test("onClose should close modal", () => {
    fakeModel.isOpen.Value = true;
    fakeModel.currentLevel.Value = 20;
    useBuilderMock([fakeModel, undefined]);
    const componentUnderTest = render(<BadgeOverviewModal />);
    fireEvent.click(componentUnderTest.getByAltText("CloseButton"));
    expect(fakeModel.isOpen.Value).toBe(false);
  });
});

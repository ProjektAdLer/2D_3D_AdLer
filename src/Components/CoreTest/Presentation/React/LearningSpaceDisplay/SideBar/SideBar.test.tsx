import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import mock from "jest-mock-extended/lib/Mock";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import ISideBarController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/ISideBarController";
import SideBar from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBar";
import React from "react";
import SideBarViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarViewModel";
import Observable from "../../../../../../Lib/Observable";

jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/FullscreenSwitch/FullscreenSwitch",
  () => "string",
);
jest.mock(
  "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskButton/HelpDeskButton",
  () => "string",
);
jest.mock(
  "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskModal/HelpDeskModal",
  () => "string",
);

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        sidebar_menuToolTip: "Menu",
        sidebar_mainMenuToolTip: "Main Menu",
        sidebar_learningWorldToolTip: "Learning World",
        sidebar_learningSpaceToolTip: "Learning Space",
        sidebar_controlsToolTip: "Controls",
        sidebar_fullscreenToolTip: "Fullscreen",
        sidebar_helpToolTip: "Help",
        sidebar_worldCompleteToolTip: "World Complete",
        sidebar_narrativeFrameworkToolTip: "Narrative Framework",
        sidebar_introStoryToolTip: "Intro Story",
        sidebar_outroStoryToolTip: "Outro Story",
        sidebar_mainMenu: "Main Menu",
        sidebar_learningWorldMenu: "Learning World Menu",
        sidebar_learningSpaceMenu: "Learning Space Menu",
        sidebar_controls: "Controls",
        sidebar_fullScreen: "Fullscreen",
        sidebar_help: "Help",
        sidebar_worldCompleted: "World Completed",
        sidebar_narrativeFrameworkIntro: "Narrative Framework",
        sidebar_introStory: "Intro Story",
        sidebar_outroStory: "Outro Story",
      };
      return translations[key] || key;
    },
  }),
}));

// Mock window.matchMedia since it's not available in Jest
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock setInterval and clearInterval
(global as any).setInterval = jest.fn(() => 123);
(global as any).clearInterval = jest.fn();

describe("SideBar", () => {
  let viewModel: SideBarViewModel;
  let controllerMock: ISideBarController;
  let mockMatchMedia: jest.Mock;

  beforeEach(() => {
    // Reset mocks for each test
    mockMatchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: mockMatchMedia,
    });

    // Ensure fresh mocks for each test
    jest.clearAllMocks();

    viewModel = new SideBarViewModel();
    controllerMock = mock<ISideBarController>();
  });

  test("should render", () => {
    useBuilderMock([viewModel, controllerMock]);
    // disable console.error
    const originalError = console.error;
    console.error = jest.fn();

    const { container } = render(<SideBar />);

    expect(container).toMatchSnapshot();

    // restore console.error
    console.error = originalError;
  });

  describe("Story Button Tests", () => {
    beforeEach(() => {
      // disable console.error for cleaner test output
      const originalError = console.error;
      console.error = jest.fn();
    });

    const openDropdown = () => {
      const menuButton = screen.getByTitle("Menu");
      fireEvent.click(menuButton);
    };

    test("renders intro story button when hasIntroStory is true", () => {
      viewModel.hasIntroStory = true;
      viewModel.allowIntroStoryButtonClick = true;
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      const introButton = screen.getByTitle("Intro Story");
      expect(introButton).toBeInTheDocument();
      expect(introButton).not.toBeDisabled();
    });

    test("does not render intro story button when hasIntroStory is false", () => {
      viewModel.hasIntroStory = false;
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      const introButton = screen.queryByTitle("Intro Story");
      expect(introButton).not.toBeInTheDocument();
    });

    test("renders disabled intro story button when allowIntroStoryButtonClick is false", () => {
      viewModel.hasIntroStory = true;
      viewModel.allowIntroStoryButtonClick = false;
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      const introButton = screen.getByTitle("Intro Story");
      expect(introButton).toBeInTheDocument();
      expect(introButton).toBeDisabled();
    });

    test("renders outro story button when hasOutroStory is true", () => {
      viewModel.hasOutroStory = true;
      viewModel.allowOutroStoryButtonClick = true;
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      const outroButton = screen.getByTitle("Outro Story");
      expect(outroButton).toBeInTheDocument();
      expect(outroButton).not.toBeDisabled();
    });

    test("does not render outro story button when hasOutroStory is false", () => {
      viewModel.hasOutroStory = false;
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      const outroButton = screen.queryByTitle("Outro Story");
      expect(outroButton).not.toBeInTheDocument();
    });

    test("renders disabled outro story button when allowOutroStoryButtonClick is false", () => {
      viewModel.hasOutroStory = true;
      viewModel.allowOutroStoryButtonClick = false;
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      const outroButton = screen.getByTitle("Outro Story");
      expect(outroButton).toBeInTheDocument();
      expect(outroButton).toBeDisabled();
    });

    test("calls onIntroStoryButtonClicked when intro story button is clicked", () => {
      viewModel.hasIntroStory = true;
      viewModel.allowIntroStoryButtonClick = true;
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      const introButton = screen.getByTitle("Intro Story");
      fireEvent.click(introButton);

      expect(controllerMock.onIntroStoryButtonClicked).toHaveBeenCalledTimes(1);
    });

    test("calls onOutroStoryButtonClicked when outro story button is clicked", () => {
      viewModel.hasOutroStory = true;
      viewModel.allowOutroStoryButtonClick = true;
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      const outroButton = screen.getByTitle("Outro Story");
      fireEvent.click(outroButton);

      expect(controllerMock.onOutroStoryButtonClicked).toHaveBeenCalledTimes(1);
    });

    test("renders both intro and outro story buttons when both are available", () => {
      viewModel.hasIntroStory = true;
      viewModel.allowIntroStoryButtonClick = true;
      viewModel.hasOutroStory = true;
      viewModel.allowOutroStoryButtonClick = true;
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      const introButton = screen.getByTitle("Intro Story");
      const outroButton = screen.getByTitle("Outro Story");

      expect(introButton).toBeInTheDocument();
      expect(outroButton).toBeInTheDocument();
      expect(introButton).not.toBeDisabled();
      expect(outroButton).not.toBeDisabled();
    });

    test("does not call controller methods when disabled buttons are clicked", () => {
      viewModel.hasIntroStory = true;
      viewModel.allowIntroStoryButtonClick = false;
      viewModel.hasOutroStory = true;
      viewModel.allowOutroStoryButtonClick = false;
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      const introButton = screen.getByTitle("Intro Story");
      const outroButton = screen.getByTitle("Outro Story");

      fireEvent.click(introButton);
      fireEvent.click(outroButton);

      expect(controllerMock.onIntroStoryButtonClicked).not.toHaveBeenCalled();
      expect(controllerMock.onOutroStoryButtonClicked).not.toHaveBeenCalled();
    });
  });

  describe("Other Button Tests", () => {
    const openDropdown = () => {
      const menuButton = screen.getByTitle("Menu");
      fireEvent.click(menuButton);
    };

    test("calls onMainMenuButtonClicked when main menu button is clicked", () => {
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      const mainMenuButton = screen.getByTitle("Main Menu");
      fireEvent.click(mainMenuButton);

      expect(controllerMock.onMainMenuButtonClicked).toHaveBeenCalledTimes(1);
    });

    test("calls onWorldMenuButtonClicked when world menu button is clicked", () => {
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      const worldMenuButton = screen.getByTitle("Learning World");
      fireEvent.click(worldMenuButton);

      expect(controllerMock.onWorldMenuButtonClicked).toHaveBeenCalledTimes(1);
    });

    test("calls onSpaceMenuButtonClicked when space menu button is clicked", () => {
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      const spaceMenuButton = screen.getByTitle("Learning Space");
      fireEvent.click(spaceMenuButton);

      expect(controllerMock.onSpaceMenuButtonClicked).toHaveBeenCalledTimes(1);
    });

    test("calls onControlsExplanationButtonClicked when controls button is clicked", () => {
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      const controlsButton = screen.getByTitle("Controls");
      fireEvent.click(controlsButton);

      expect(
        controllerMock.onControlsExplanationButtonClicked,
      ).toHaveBeenCalledTimes(1);
    });

    test("calls onWorldCompletionModalButtonClicked when world completion button is clicked and enabled", () => {
      viewModel.allowWorldCompletionModalButtonClick = true;
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      const worldCompletionButton = screen.getByTitle("World Complete");
      fireEvent.click(worldCompletionButton);

      expect(
        controllerMock.onWorldCompletionModalButtonClicked,
      ).toHaveBeenCalledTimes(1);
    });

    test("does not call onWorldCompletionModalButtonClicked when world completion button is disabled", () => {
      viewModel.allowWorldCompletionModalButtonClick = false;
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      const worldCompletionButton = screen.getByTitle("World Complete");
      fireEvent.click(worldCompletionButton);

      expect(
        controllerMock.onWorldCompletionModalButtonClicked,
      ).not.toHaveBeenCalled();
    });

    test("calls onNarrativeFrameworkIntroButtonClicked when narrative framework button is clicked", () => {
      viewModel.allowNarrativeFrameworkIntroButtonClick = new Observable(
        true,
        false,
      );
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      const narrativeButton = screen.getByTitle("Narrative Framework");
      fireEvent.click(narrativeButton);

      expect(
        controllerMock.onNarrativeFrameworkIntroButtonClicked,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe("Time Display Tests", () => {
    const openDropdown = () => {
      const menuButton = screen.getByTitle("Menu");
      fireEvent.click(menuButton);
    };

    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2024-01-15 14:30:45"));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test("displays current date and time", () => {
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      // Check for date display (format may vary based on locale)
      expect(screen.getByText(/15\.1\.2024|1\/15\/2024/)).toBeInTheDocument();
      // Check for time display
      expect(screen.getByText(/14:30:45|2:30:45/)).toBeInTheDocument();
    });

    test("component initializes timer interval correctly", () => {
      const setIntervalSpy = jest.spyOn(global, "setInterval");
      const clearIntervalSpy = jest.spyOn(global, "clearInterval");

      useBuilderMock([viewModel, controllerMock]);

      const { unmount } = render(<SideBar />);

      // Check that setInterval was called (timer initialization)
      expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 1000);

      unmount();

      // Check that clearInterval was called on unmount
      expect(clearIntervalSpy).toHaveBeenCalled();

      setIntervalSpy.mockRestore();
      clearIntervalSpy.mockRestore();
    });
  });

  describe("Rendering Edge Cases", () => {
    test("returns null when viewModel is null", () => {
      useBuilderMock([null, controllerMock]);

      const { container } = render(<SideBar />);

      expect(container.firstChild).toBeNull();
    });

    test("returns null when viewModel is undefined", () => {
      useBuilderMock([undefined, controllerMock]);

      const { container } = render(<SideBar />);

      expect(container.firstChild).toBeNull();
    });

    test("applies custom className when provided", () => {
      useBuilderMock([viewModel, controllerMock]);

      const { container } = render(<SideBar className="custom-class" />);

      expect(container.firstChild).toHaveClass("custom-class");
      expect(container.firstChild).toHaveClass("w-20"); // Default class should also be present
    });

    test("renders without custom className", () => {
      useBuilderMock([viewModel, controllerMock]);

      const { container } = render(<SideBar />);

      expect(container.firstChild).toHaveClass("w-20");
    });
  });

  describe("Version Display Tests", () => {
    test("displays version information", () => {
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);

      const openDropdown = () => {
        const menuButton = screen.getByTitle("Menu");
        fireEvent.click(menuButton);
      };

      openDropdown();

      // Check for version display
      expect(screen.getByText(/Version:/)).toBeInTheDocument();
    });
  });

  describe("Accessibility Tests", () => {
    const openDropdown = () => {
      const menuButton = screen.getByTitle("Menu");
      fireEvent.click(menuButton);
    };

    test("all buttons have proper titles/tooltips", () => {
      viewModel.hasIntroStory = true;
      viewModel.hasOutroStory = true;
      viewModel.allowIntroStoryButtonClick = true;
      viewModel.allowOutroStoryButtonClick = true;
      viewModel.allowWorldCompletionModalButtonClick = true;
      viewModel.allowNarrativeFrameworkIntroButtonClick = new Observable(
        true,
        false,
      );

      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      openDropdown();

      // Check that all buttons have proper titles - now all should be on first page
      expect(screen.getByTitle("Main Menu")).toBeInTheDocument();
      expect(screen.getByTitle("Learning World")).toBeInTheDocument();
      expect(screen.getByTitle("Learning Space")).toBeInTheDocument();
      expect(screen.getByTitle("Controls")).toBeInTheDocument();
      expect(screen.getByTitle("Intro Story")).toBeInTheDocument();
      expect(screen.getByTitle("Outro Story")).toBeInTheDocument();
      expect(screen.getByTitle("Narrative Framework")).toBeInTheDocument();
      expect(screen.getByTitle("World Complete")).toBeInTheDocument();
    });

    test("all images have proper alt attributes", () => {
      const openDropdown = () => {
        const menuButton = screen.getByTitle("Menu");
        fireEvent.click(menuButton);
      };

      viewModel.hasIntroStory = true;
      viewModel.hasOutroStory = true;

      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);

      // Check main menu icon alt
      const menuIcon = screen.getByAltText("EngineLogo");
      expect(menuIcon).toBeInTheDocument();

      openDropdown();

      // Check other icons have alt attributes (even if empty)
      const images = screen.getAllByRole("img");
      images.forEach((img) => {
        expect(img).toHaveAttribute("alt");
      });
    });
  });

  describe("Layout and Styling Tests", () => {
    test("renders proper layout structure", () => {
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);

      // Check for main container structure
      const container = screen.getByRole("img").closest("div");
      expect(container).toBeInTheDocument();
    });

    test("renders header with date and time", () => {
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);

      const openDropdown = () => {
        const menuButton = screen.getByTitle("Menu");
        fireEvent.click(menuButton);
      };

      openDropdown();

      // Check for header element containing date/time
      const dateElement = screen.getByText(
        /\d{1,2}\.\d{1,2}\.\d{4}|\d{1,2}\/\d{1,2}\/\d{4}/,
      );
      expect(dateElement).toBeInTheDocument();

      const timeElement = screen.getByText(
        /\d{1,2}:\d{2}:\d{2}.*Uhr|\d{1,2}:\d{2}:\d{2}/,
      );
      expect(timeElement).toBeInTheDocument();
    });

    test("renders footer with version info", () => {
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);

      const openDropdown = () => {
        const menuButton = screen.getByTitle("Menu");
        fireEvent.click(menuButton);
      };

      openDropdown();

      const versionElement = screen.getByText(/Version:/);
      expect(versionElement).toBeInTheDocument();
    });
  });

  describe("Pagination Tests", () => {
    beforeEach(() => {
      // disable console.error
      const originalError = console.error;
      console.error = jest.fn();
    });

    test("hides pagination controls when totalPages = 1", () => {
      viewModel.currentPage.Value = 1;
      viewModel.totalPages.Value = 1;
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      const menuButton = screen.getByTitle("Menu");
      fireEvent.click(menuButton);

      expect(
        screen.queryByTestId("sidebar-page-previous"),
      ).not.toBeInTheDocument();
      expect(screen.queryByTestId("sidebar-page-next")).not.toBeInTheDocument();
    });

    test("shows pagination controls when totalPages > 1", () => {
      // Mock mehr als 9 sichtbare Buttons um Pagination zu triggern
      viewModel.allButtons = [...Array(12)].map((_, i) => ({
        id: `button${i}`,
        icon: "icon.svg",
        tooltip: `tooltip${i}`,
        label: `label${i}`,
        onClick: "onMainMenuButtonClicked" as keyof ISideBarController,
        visible: () => true,
        disabled: () => false,
      }));

      viewModel.currentPage.Value = 2;
      viewModel.totalPages.Value = 2; // wird automatisch berechnet basierend auf 12 buttons / 9 per page
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      const menuButton = screen.getByTitle("Menu");
      fireEvent.click(menuButton);

      expect(screen.getByTestId("sidebar-page-previous")).toBeInTheDocument();
      expect(screen.getByTestId("sidebar-page-next")).toBeInTheDocument();
      expect(screen.getByText("2 / 2")).toBeInTheDocument();
    });

    test("calls controller.previousPage when previous button is clicked", () => {
      // Mock mehr als 9 sichtbare Buttons um Pagination zu triggern
      viewModel.allButtons = [...Array(12)].map((_, i) => ({
        id: `button${i}`,
        icon: "icon.svg",
        tooltip: `tooltip${i}`,
        label: `label${i}`,
        onClick: "onMainMenuButtonClicked" as keyof ISideBarController,
        visible: () => true,
        disabled: () => false,
      }));

      viewModel.currentPage.Value = 2;
      viewModel.totalPages.Value = 2;
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      const menuButton = screen.getByTitle("Menu");
      fireEvent.click(menuButton);

      const previousButton = screen.getByTestId("sidebar-page-previous");
      fireEvent.click(previousButton);

      expect(controllerMock.previousPage).toHaveBeenCalledTimes(1);
    });

    test("calls controller.nextPage when next button is clicked", () => {
      // Mock mehr als 9 sichtbare Buttons um Pagination zu triggern
      viewModel.allButtons = [...Array(12)].map((_, i) => ({
        id: `button${i}`,
        icon: "icon.svg",
        tooltip: `tooltip${i}`,
        label: `label${i}`,
        onClick: "onMainMenuButtonClicked" as keyof ISideBarController,
        visible: () => true,
        disabled: () => false,
      }));

      viewModel.currentPage.Value = 1;
      viewModel.totalPages.Value = 2;
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      const menuButton = screen.getByTitle("Menu");
      fireEvent.click(menuButton);

      const nextButton = screen.getByTestId("sidebar-page-next");
      fireEvent.click(nextButton);

      expect(controllerMock.nextPage).toHaveBeenCalledTimes(1);
    });

    test("disables previous button on first page", () => {
      // Mock mehr als 9 sichtbare Buttons um Pagination zu triggern
      viewModel.allButtons = [...Array(12)].map((_, i) => ({
        id: `button${i}`,
        icon: "icon.svg",
        tooltip: `tooltip${i}`,
        label: `label${i}`,
        onClick: "onMainMenuButtonClicked" as keyof ISideBarController,
        visible: () => true,
        disabled: () => false,
      }));

      viewModel.currentPage.Value = 1;
      viewModel.totalPages.Value = 2;
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      const menuButton = screen.getByTitle("Menu");
      fireEvent.click(menuButton);

      const previousButton = screen.getByTestId("sidebar-page-previous");
      expect(previousButton).toBeDisabled();
    });

    test("disables next button on last page", () => {
      // Mock mehr als 9 sichtbare Buttons um Pagination zu triggern
      viewModel.allButtons = [...Array(12)].map((_, i) => ({
        id: `button${i}`,
        icon: "icon.svg",
        tooltip: `tooltip${i}`,
        label: `label${i}`,
        onClick: "onMainMenuButtonClicked" as keyof ISideBarController,
        visible: () => true,
        disabled: () => false,
      }));

      viewModel.currentPage.Value = 2;
      viewModel.totalPages.Value = 2;
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);
      const menuButton = screen.getByTitle("Menu");
      fireEvent.click(menuButton);

      const nextButton = screen.getByTestId("sidebar-page-next");
      expect(nextButton).toBeDisabled();
    });
  });

  describe("useEffect Tests", () => {
    test("calls controller.checkNarrativeFramework on mount", () => {
      useBuilderMock([viewModel, controllerMock]);

      render(<SideBar />);

      expect(controllerMock.checkNarrativeFramework).toHaveBeenCalledTimes(1);
    });

    test("does not call checkNarrativeFramework when controller is null", () => {
      useBuilderMock([viewModel, null]);

      render(<SideBar />);

      expect(controllerMock.checkNarrativeFramework).not.toHaveBeenCalled();
    });
  });
});

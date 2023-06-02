import "@testing-library/jest-dom";
import { Provider } from "inversify-react";
import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { act } from "@testing-library/react";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import VideoComponent from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/VideoComponent";
import LearningElementModalViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";

jest.mock(
  "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/VideoHosters/YoutubeVideoHost.tsx",
  () => "mocked"
);
jest.mock(
  "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/VideoHosters/VimeoVideoHost.tsx",
  () => "mocked"
);
jest.mock(
  "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/VideoHosters/OpencastVideoHost.tsx",
  () => "mocked"
);

jest.mock("axios");

describe("VideoComponent", () => {
  test("should render when a valid Link Youtube is Provided", async () => {
    let component: RenderResult;
    const vm = new LearningElementModalViewModel();
    vm.id.Value = 1;
    vm.filePath.Value =
      "https://www.youtube.com/watch?v=UEJpDrXuP98&ab_channel=AbroadinJapan&token=46dd4cbdafda7fc864c8ce73aae3a897";

    await act(async () => {
      component = render(
        <Provider container={CoreDIContainer}>
          <VideoComponent viewModel={vm} />
        </Provider>
      );
    });

    expect(component!).toBeDefined();
  });

  test("should render when a valid Link Vimeo is Provided", async () => {
    let component: RenderResult;
    const vm = new LearningElementModalViewModel();
    vm.id.Value = 1;
    vm.filePath.Value = "https://vimeo.com/123456789";

    await act(async () => {
      component = render(
        <Provider container={CoreDIContainer}>
          <VideoComponent viewModel={vm} />
        </Provider>
      );
    });

    expect(component!).toBeDefined();
  });

  test("should render when a valid Link Opencast is Provided", async () => {
    let component: RenderResult;
    const vm = new LearningElementModalViewModel();
    vm.id.Value = 1;
    vm.filePath.Value = "paella";

    await act(async () => {
      component = render(
        <Provider container={CoreDIContainer}>
          <VideoComponent viewModel={vm} />
        </Provider>
      );
    });

    expect(component!).toBeDefined();
  });

  test("should throw an error, if no valid link is provided", async () => {
    let component: RenderResult;
    const vm = new LearningElementModalViewModel();
    vm.parentWorldID.Value = 1;
    vm.id.Value = 1;
    vm.filePath.Value = "XXXX";

    await act(async () => {
      component = render(
        <Provider container={CoreDIContainer}>
          <VideoComponent viewModel={vm} />
        </Provider>
      );
    });

    expect(component!).toBeDefined();
    expect(
      component!.getByText("No Video Component found for given URLXXXX")
    ).toBeDefined();
  });

  test("should return null, if no link is provided", async () => {
    let component: RenderResult;
    const vm = new LearningElementModalViewModel();
    vm.parentWorldID.Value = 1;
    vm.id.Value = 1;
    // @ts-ignore
    vm.filePath.Value = undefined;

    await act(async () => {
      component = render(
        <Provider container={CoreDIContainer}>
          <VideoComponent viewModel={vm} />
        </Provider>
      );
    });

    expect(component!).toBeDefined();
    expect(component!.container).toBeEmptyDOMElement();
  });
});

import "@testing-library/jest-dom";
import { Provider } from "inversify-react";
import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { act } from "@testing-library/react";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import VideoComponent from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/VideoComponent";
import LearningElementModalViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";

import * as axios from "axios";

jest.mock("axios");

describe("VideoComponent", () => {
  test("should render when a valid Link is Provided", async () => {
    // @ts-ignore
    axios.get.mockResolvedValue({
      data: {
        html: '<iframe width="480" height="270" src="https://www.youtube.com/embed/UEJpDrXuP98?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        title: "Abroad in Japan - YouTube",
      },
    });

    let component: RenderResult;
    const vm = new LearningElementModalViewModel();
    vm.parentWorldID.Value = 1;
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
    expect(component!.getByTitle("Abroad in Japan - YouTube")).toBeDefined();
  });

  test("should throw an error, if no valid link is provided", async () => {
    // @ts-ignore
    axios.get.mockResolvedValue({
      data: "Bad response",
    });

    let component: RenderResult;
    const vm = new LearningElementModalViewModel();
    vm.parentWorldID.Value = 1;
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
    expect(
      component!.getByTitle(
        "Could not extract video url from youtube oembed api"
      )
    ).toBeDefined();
  });
});

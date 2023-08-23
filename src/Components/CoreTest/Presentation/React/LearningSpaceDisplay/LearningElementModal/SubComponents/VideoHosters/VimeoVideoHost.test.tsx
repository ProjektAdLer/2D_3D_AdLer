import { RenderResult, act, render, waitFor } from "@testing-library/react";
import React from "react";
import VimeoVideoHost from "./../../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/VideoHosters/VimeoVideoHost";
import axios from "axios";
import Logger from "../../../../../../../Core/Adapters/Logger/Logger";

const url = "https://vimeo.com/236357509";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("VimeoVideoHost", () => {
  test("renders an iframe with the provided URL", () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        html: '<iframe src="https://player.vimeo.com/video/782061723?app_id=122963" width="426" height="240" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="title.mp4"></iframe>',
        title: "TestTitle",
      },
    });

    let container: RenderResult;
    act(() => {
      container = render(<VimeoVideoHost url={url} />);
    });

    waitFor(() => {
      const iframe = container!.getByTitle("TestTitle");
      expect(iframe).toHaveAttribute("src", url);
    });
  });

  test("returns null if no URL is provided", () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        html: "URL",
        title: "Title",
      },
    });

    let container: HTMLElement;
    act(() => {
      container = render(<VimeoVideoHost url="" />).container;
    });

    expect(container!.firstChild).toBeNull();
  });

  test("logs error if srcArray is not of length 2", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        html: "url",
        title: "title",
      },
    });
    const loggerMock = jest.spyOn(Logger.prototype, "log");

    act(() => {
      render(<VimeoVideoHost url={url} />);
    });

    waitFor(() => {
      expect(loggerMock).toBeCalledTimes(1);
    });
  });
});

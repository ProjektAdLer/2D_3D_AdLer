import React from "react";
import { render, act } from "@testing-library/react";
import axios from "axios";
import YoutubeVideoHost from "../../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/VideoHosters/YoutubeVideoHost";
import Logger from "../../../../../../../Core/Adapters/Logger/Logger";

jest.mock("axios");

describe("YoutubeVideoHost", () => {
  const url = "https://www.youtube.com/watch?v=BqfiwegsGpY";

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders an iframe with the provided URL", async () => {
    const videoUrl =
      "https://www.youtube-nocookie.com/embed/BqfiwegsGpY?feature=oembed";
    const response = {
      data: {
        html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/BqfiwegsGpY?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="Tesla FSD gets Overly Aggressive: The Sequel"></iframe>',
      },
    };
    (axios.get as jest.Mock).mockResolvedValue(response);

    let container;
    await act(async () => {
      ({ container } = render(<YoutubeVideoHost url={url} />));
    });

    const iframe = container.querySelector("iframe");
    expect(iframe).toHaveAttribute("src", videoUrl);
  });

  it("returns null if no video URL is provided", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { items: [] } });

    let container;
    await act(async () => {
      ({ container } = render(<YoutubeVideoHost url={url} />));
    });

    expect(container.firstChild).toBeNull();
  });

  it("logs an error if the video URL cannot be extracted", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: { items: [{ id: "invalid-id" }] },
    });
    const loggerMock = jest.spyOn(Logger.prototype, "log");

    let container;
    await act(async () => {
      ({ container } = render(<YoutubeVideoHost url={url} />));
    });

    expect(container.firstChild).toBeNull();
    expect(loggerMock).toHaveBeenCalled();

    loggerMock.mockRestore();
  });
});

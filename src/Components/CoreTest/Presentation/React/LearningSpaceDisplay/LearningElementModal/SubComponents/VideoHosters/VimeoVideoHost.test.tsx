import { render } from "@testing-library/react";
import React from "react";
import VimeoVideoHost from "./../../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/VideoHosters/VimeoVideoHost";
import mock, { mockDeep } from "jest-mock-extended/lib/Mock";
import axios from "axios";
import { logger } from "../../../../../../../../Lib/Logger";

const url = "https://vimeo.com/236357509";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("VimeoVideoHost", () => {
  it.skip("renders an iframe with the provided URL", () => {
    const { container } = render(<VimeoVideoHost url={url} />);
    const iframe = container.getElementsByClassName(
      "w-full rounded-lg aspect-video"
    )[0];
    expect(iframe).toHaveAttribute("src", url);
  });
  it("returns null if no URL is provided", () => {
    // @ts-ignore
    const { container } = render(<VimeoVideoHost />);
    expect(container.firstChild).toBeNull();
  });
  test.skip("logs error if srcArray is not of length 2", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        html: "URL",
        title: "Title",
      },
    });

    render(<VimeoVideoHost url={url} />);

    expect(logger.error).toBeCalledWith(
      "Could not extract video url from vimeo oembed api"
    );
  });
});

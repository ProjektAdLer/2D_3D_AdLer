import { render } from "@testing-library/react";
import React from "react";
import VimeoVideoHost from "./../../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/VideoHosters/VimeoVideoHost";

describe("VimeoVideoHost", () => {
  it.skip("renders an iframe with the provided URL", () => {
    const url = "https://vimeo.com/236357509";
    const { container } = render(<VimeoVideoHost url={url} />);
    const iframe = container.getElementsByClassName(
      "w-full rounded-lg aspect-video"
    )[0];
    expect(iframe).toHaveAttribute("src", url);
  });
});

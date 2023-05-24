import React from "react";
import { render } from "@testing-library/react";
import OpencastVideoHost from "./../../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/VideoHosters/OpencastVideoHost";

describe("OpencastVideoHost", () => {
  it("renders an iframe with the provided URL", () => {
    const url = "https://example.com";
    const { container } = render(<OpencastVideoHost url={url} />);
    const iframe = container.getElementsByClassName(
      "w-full rounded-lg aspect-video"
    )[0];
    expect(iframe).toHaveAttribute("src", url);
  });

  it("returns null if no URL is provided", () => {
    // @ts-ignore
    const { container } = render(<OpencastVideoHost />);
    expect(container.firstChild).toBeNull();
  });
});

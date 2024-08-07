import LearningElementModalViewModel from "../LearningElementModalViewModel";
import { config } from "../../../../../../../config";

function fixLocalhost(url: string) {
  if (url.includes("localhost")) {
    return url.replace("http:", "");
  }
  return url;
}

export function createH5POptions(viewModel: LearningElementModalViewModel) {
  let baseURL = config.serverURL.replace(/api\/?$/, "");

  let h5pJsonURL =
    baseURL +
    viewModel.filePath.Value.replaceAll("\\", "/").replaceAll("wwwroot/", "");

  const options = {
    h5pJsonPath: fixLocalhost(h5pJsonURL),
    frameJs: "/h5pBase/frame.bundle.js",
    frameCss: "/h5pBase/styles/h5p.css",
  };
  return options;
}

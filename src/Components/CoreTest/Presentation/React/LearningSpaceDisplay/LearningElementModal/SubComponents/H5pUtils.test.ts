import Observable from "../../../../../../../Lib/Observable";
import LearningElementModalViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";
import { createH5POptions } from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/H5pUtils";
import { config } from "../../../../../../../config";

const oldConfigServerURL = config.serverURL;

describe("H5pUtils", () => {
  let viewModelMock: LearningElementModalViewModel;

  beforeAll(() => {
    viewModelMock = new LearningElementModalViewModel();
  });

  beforeEach(() => {
    viewModelMock.filePath = new Observable<string>();
    viewModelMock.filePath.Value = "";
  });

  afterAll(() => {
    config.serverURL = oldConfigServerURL;
  });

  test("createH5POptions doesn't change url if no localhost is present", () => {
    config.serverURL = "https://dev.api.projekt-adler.eu";
    const result = createH5POptions(viewModelMock);

    expect(result.h5pJsonPath).toBe("https://dev.api.projekt-adler.eu");
  });

  test("createH5POptions changes url if localhost is present", () => {
    config.serverURL = "http://localhost:1337";
    const result = createH5POptions(viewModelMock);

    expect(result.h5pJsonPath).toBe("//localhost:1337");
  });
});

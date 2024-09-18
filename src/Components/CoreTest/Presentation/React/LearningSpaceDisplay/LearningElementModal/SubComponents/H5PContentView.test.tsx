import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import LearningElementModalViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";
import H5PContent from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/H5PContent";
import React from "react";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import mock from "jest-mock-extended/lib/Mock";
import { Provider } from "inversify-react";
import ILearningElementModalController from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/ILearningElementModalController";

const viewModel = new LearningElementModalViewModel();
viewModel.id.Value = 1;
viewModel.parentWorldID.Value = 1;

jest.mock("h5p-standalone");

const elementModalControllerMock = mock<ILearningElementModalController>();

describe.skip("H5PContentView", () => {
  window["H5P"] = {
    externalDispatcher: {
      on: () => {},
      off: () => {},
    },
  };
  window["H5PIntegration"] = {
    contents: {},
  };

  //ANF-ID: [ELG0030, EWE0037]
  test("should render", () => {
    viewModel.filePath.Value =
      "wwwroot\\courses\\2\\World_For_Evaluation\\h5p\\H5P-SchiebeSpiel";

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <H5PContent
          viewModel={viewModel}
          controller={elementModalControllerMock}
        />
      </Provider>,
    );

    waitFor(() => {
      expect(container).not.toBeEmptyDOMElement();
    });
  });
});

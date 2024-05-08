import "@testing-library/jest-dom";
import { render, RenderResult } from "@testing-library/react";
import { Provider } from "inversify-react";
import { mock } from "jest-mock-extended";
import React from "react";
import { act } from "@testing-library/react";
import IGetLearningElementSourceUseCase from "../../../../../../Core/Application/UseCases/GetLearningElementSource/IGetLearningElementSourceUseCase";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import LearningElementModalViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";
import TextComponent from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/TextComponent";

const sourceUseCase = mock<IGetLearningElementSourceUseCase>();

describe("TextElementSubComponent", () => {
  beforeAll(() => {
    //@ts-ignore
    global.fetch = () => {
      return Promise.resolve({
        text: () => Promise.resolve("Test Text"),
      });
    };
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();

    sourceUseCase.internalExecuteAsync.mockResolvedValue("test");

    CoreDIContainer.bind<IGetLearningElementSourceUseCase>(
      USECASE_TYPES.IGetLearningElementSourceUseCase
    ).toConstantValue(sourceUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  // ANF-ID: [EWE0037]
  test("should render its Text", async () => {
    const vm = new LearningElementModalViewModel();
    vm.parentWorldID.Value = 1;
    vm.id.Value = 1;
    vm.filePath.Value = "";
    let component: RenderResult;
    await act(async () => {
      component = render(
        <Provider container={CoreDIContainer}>
          <TextComponent viewModel={vm} />
        </Provider>
      );
    });

    expect(component!.getByText("Test Text")).toBeInTheDocument();
  });
});

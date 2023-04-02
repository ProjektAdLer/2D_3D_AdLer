import "@testing-library/jest-dom";
import { Provider } from "inversify-react";
import { render, RenderResult } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import { act } from "@testing-library/react";
import IGetLearningElementSourceUseCase from "../../../../../../Core/Application/UseCases/GetLearningElementSource/IGetLearningElementSourceUseCase";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import ImageComponent from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/ImageComponent";
import LearningElementModalViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";

const sourceUseCase = mock<IGetLearningElementSourceUseCase>();

describe("ImageComponent", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();

    //@ts-ignore
    sourceUseCase["executeAsync"] = () =>
      Promise.resolve(
        "https://testmoodle.cluuub.xyz/webservice/pluginfile.php/284/mod_resource/content/0/Cars%20is%20cool.jpg?forcedownload=1&token=46dd4cbdafda7fc864c8ce73aae3a897"
      );

    CoreDIContainer.bind<IGetLearningElementSourceUseCase>(
      USECASE_TYPES.IGetLearningElementSourceUseCase
    ).toConstantValue(sourceUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  it("should render", async () => {
    let component: RenderResult;
    const vm = new LearningElementModalViewModel();
    vm.parentWorldID.Value = 1;
    vm.id.Value = 1;

    await act(async () => {
      component = render(
        <Provider container={CoreDIContainer}>
          <ImageComponent viewModel={vm} />
        </Provider>
      );
    });

    expect(component!).toBeDefined();
  });
});

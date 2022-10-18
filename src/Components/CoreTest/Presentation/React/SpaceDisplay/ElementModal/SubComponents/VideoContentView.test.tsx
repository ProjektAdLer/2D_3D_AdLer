import "@testing-library/jest-dom";
import { Provider } from "inversify-react";
import { render, RenderResult } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import { act } from "@testing-library/react";
import IGetElementSourceUseCase from "../../../../../../Core/Application/UseCases/GetElementSourceUseCase/IGetElementSourceUseCase";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import VideoComponent from "../../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/SubComponents/VideoComponent";
import ElementModalViewModel from "../../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalViewModel";

const sourceUseCase = mock<IGetElementSourceUseCase>();

describe("VideoComponent", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();

    //@ts-ignore
    sourceUseCase["executeAsync"] = () =>
      Promise.resolve(
        "https://www.youtube.com/watch?v=UEJpDrXuP98&ab_channel=AbroadinJapan&token=46dd4cbdafda7fc864c8ce73aae3a897"
      );

    CoreDIContainer.bind<IGetElementSourceUseCase>(
      USECASE_TYPES.IGetElementSource
    ).toConstantValue(sourceUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  it("should render", async () => {
    let component: RenderResult;
    const vm = new ElementModalViewModel();
    vm.parentCourseId.Value = 1;
    vm.id.Value = 1;

    await act(async () => {
      component = render(
        <Provider container={CoreDIContainer}>
          <VideoComponent viewModel={vm} />
        </Provider>
      );
    });

    expect(component!).toBeDefined();
  });
});

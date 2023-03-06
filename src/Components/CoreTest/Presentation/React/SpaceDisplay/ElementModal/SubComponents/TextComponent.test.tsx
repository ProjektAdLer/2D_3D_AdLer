import "@testing-library/jest-dom";
import { render, RenderResult } from "@testing-library/react";
import { Provider } from "inversify-react";
import { mock } from "jest-mock-extended";
import React from "react";
import { act } from "@testing-library/react";
import IGetElementSourceUseCase from "../../../../../../Core/Application/UseCases/GetElementSource/IGetElementSourceUseCase";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ElementModalViewModel from "../../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalViewModel";
import TextComponent from "../../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/SubComponents/TextComponent";

const sourceUseCase = mock<IGetElementSourceUseCase>();

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

    sourceUseCase.executeAsync.mockResolvedValue("test");

    CoreDIContainer.bind<IGetElementSourceUseCase>(
      USECASE_TYPES.IGetElementSourceUseCase
    ).toConstantValue(sourceUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });
  test("should render its Text", async () => {
    const vm = new ElementModalViewModel();
    vm.parentWorldID.Value = 1;
    vm.id.Value = 1;
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

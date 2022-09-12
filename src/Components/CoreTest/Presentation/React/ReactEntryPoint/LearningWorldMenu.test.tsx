import { render } from "@testing-library/react";
import { Provider } from "inversify-react";
import { mock } from "jest-mock-extended";
import ILoadWorldUseCase from "src/Components/Core/Application/LoadWorld/ILoadWorldUseCase";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import LearningWorldMenu from "~ReactComponents/ReactEntryPoint/LearningWorldMenu";

jest.mock("~ReactComponents/HeaderBar/HeaderBar", () => "mocked");
jest.mock(
  "~ReactComponents/LearningRoomSelection/LearningRoomSelection",
  () => "mocked"
);

const loadWorldUseCaseMock = mock<ILoadWorldUseCase>();

describe("LearningWorldMenu", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(USECASE_TYPES.ILoadWorldUseCase).toConstantValue(
      loadWorldUseCaseMock
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should render", () => {
    render(
      <Provider container={CoreDIContainer}>
        <LearningWorldMenu />
      </Provider>
    );
  });
});

import LoadWorldUseCase from "../../../Core/Application/LoadWorld/LoadWorldUseCase";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../Core/DependencyInjection/UseCases/USECASE_SYMBOLS";
import type IBackend from "../../../Core/Adapters/Backend/IBackend";
import { injectable } from "inversify";
import { APIWorldTo } from "../../../Core/Adapters/Backend/APIWorldTO";
import LearningWorldPort from "../../../Core/Presentation/Ports/LearningWorldPort/LearningWorldPort";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import { APILearningElementTO } from "../../../Core/Adapters/Backend/APILearningElementTO";
import { APILearningRoomTO } from "../../../Core/Adapters/Backend/APILearningRoomTO";

const apiWorldTo: APIWorldTo = {
  name: "test",
  description: "test description",
  learningRoommIds: [0, 1],
};

@injectable()
//@ts-ignore
class BackendMock implements IBackend {
  // TODO: extend this when the Backend is better defined
  getWorld(): Promise<Partial<APIWorldTo>> {
    return Promise.resolve(undefined);
  }
  getLearningElements(): Promise<Partial<APILearningElementTO[]>> {
    return Promise.resolve([]);
  }
  getLearningRooms(): Promise<Partial<APILearningRoomTO[]>> {
    return Promise.resolve([]);
  }
}

const getWorldMock = jest.spyOn(BackendMock.prototype, "getWorld");
const presentLearningWorldMock = jest.spyOn(
  LearningWorldPort.prototype,
  "presentLearningWorld"
);

// TODO: this is a temporary solution to test the use case
// load should be tested when the backend is better defined
LoadWorldUseCase.prototype["load"] = jest.fn();

describe("LoadWorldUseCase", () => {
  let useCase: LoadWorldUseCase;

  beforeEach(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.unbind(CORE_TYPES.IBackend);
    CoreDIContainer.bind(CORE_TYPES.IBackend).to(BackendMock);

    useCase = CoreDIContainer.get<LoadWorldUseCase>(
      USECASE_TYPES.ILoadWorldUseCase
    );
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("loadWorldUseCase is defined", () => {
    expect(useCase).toBeDefined();
  });

  test.skip("loadWorldUseCase should call the backend", async () => {
    //TODO: extend this when the backend is better defined
    await useCase.executeAsync();
    expect(presentLearningWorldMock).toHaveBeenCalledTimes(1);
  });
});

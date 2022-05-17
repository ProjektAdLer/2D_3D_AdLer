import { injectable } from "inversify";
import ILearningElementStartedUseCase from "../../../Core/Application/LearningElementStarted/ILearningElementStartedUseCase";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../Core/DependencyInjection/UseCases/USECASE_SYMBOLS";
import IEntityContainer from "../../../Core/Domain/EntityContainer/IEntityContainer";
import LearningElementPort from "../../../Core/Presentation/Ports/LearningElementPort/LearningElementPort";
import { ConstructorReference } from "../../../Core/Types/EntityManagerTypes";

const portMock = jest.spyOn(
  LearningElementPort.prototype,
  "startLearningElementEditing"
);

@injectable()
//@ts-ignore
class EntityContainerMock implements IEntityContainer {
  filterEntitiesOfType<T extends object>(
    entityType: ConstructorReference<T>,
    filter: (entity: T) => boolean
  ): T[] {
    return [
      {
        id: 1,
      },
    ] as T[];
  }
}

describe("Calculate Total Room Score UseCase", () => {
  beforeEach(() => {
    CoreDIContainer.snapshot();
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  it("should call the presenter of the Room with the LE ", () => {
    CoreDIContainer.unbind(CORE_TYPES.IEntityContainer);
    CoreDIContainer.bind(CORE_TYPES.IEntityContainer).to(EntityContainerMock);

    const useCaseToTest = CoreDIContainer.get<ILearningElementStartedUseCase>(
      USECASE_TYPES.ILearningElementStartedUseCase
    );

    useCaseToTest.execute({
      learningElementId: 1,
    });

    expect(portMock).toHaveBeenCalledWith({
      id: 1,
    });
  });

  it("should throw, if the learning Element is not found", () => {
    const useCaseToTest = CoreDIContainer.get<ILearningElementStartedUseCase>(
      USECASE_TYPES.ILearningElementStartedUseCase
    );

    expect(() => {
      useCaseToTest.execute({
        learningElementId: 2,
      });
    }).toThrow();
  });
});

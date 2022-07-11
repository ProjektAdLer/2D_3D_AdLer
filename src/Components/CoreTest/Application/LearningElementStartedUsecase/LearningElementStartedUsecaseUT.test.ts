import { injectable } from "inversify";
import ILearningElementStartedUseCase from "../../../Core/Application/LearningElementStarted/ILearningElementStartedUseCase";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IEntityContainer from "../../../Core/Domain/EntityContainer/IEntityContainer";
import LearningElementPort from "../../../Core/Ports/LearningElementPort/LearningElementPort";
import { ConstructorReference } from "../../../Core/Types/EntityManagerTypes";

import { mock } from "jest-mock-extended";
import ILearningElementPort from "../../../Core/Application/LearningElementStarted/ILearningElementPort";
import PORT_TYPES from "../../../Core/DependencyInjection/Ports/PORT_TYPES";
import LearningElementStartedUseCase from "../../../Core/Application/LearningElementStarted/LearningElementStartedUseCase";

const learningElementPortMock = mock<ILearningElementPort>();
const entityContainerMock = mock<IEntityContainer>();

describe("Calculate Total Room Score UseCase", () => {
  let useCaseToTest;
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.unbind(CORE_TYPES.IEntityContainer);
    CoreDIContainer.bind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);

    CoreDIContainer.unbind(PORT_TYPES.ILearningElementPort);
    CoreDIContainer.bind(PORT_TYPES.ILearningElementPort).toConstantValue(
      learningElementPortMock
    );
  });
  beforeEach(() => {
    useCaseToTest = CoreDIContainer.resolve(LearningElementStartedUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  it("should call the presenter of the Room with the LE ", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
      },
    ]);

    useCaseToTest.execute({
      learningElementId: 1,
    });

    expect(
      learningElementPortMock.startLearningElementEditing
    ).toHaveBeenCalledWith({
      id: 1,
    });
  });

  it("should throw, if the learning Element is not found", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);
    expect(() => {
      useCaseToTest.execute({
        learningElementId: 2,
      });
    }).toThrow();
  });

  test("filter Callback should return a boolean", () => {
    let filterReturn: boolean;
    entityContainerMock.filterEntitiesOfType.mockImplementation(
      <T>(
        entityType: ConstructorReference<T>,
        filter: (entity: T) => boolean
      ) => {
        filterReturn = filter(new entityType());
        return [
          {
            learningElements: [],
          },
        ];
      }
    );

    useCaseToTest.execute({
      learningElementId: 1,
    });

    // @ts-ignore TS does not know about the mock
    expect(filterReturn).toBe(false);
  });
});

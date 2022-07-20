import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../Core/Domain/EntityContainer/IEntityContainer";
import { ConstructorReference } from "../../../Core/Types/EntityManagerTypes";

import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../Core/DependencyInjection/Ports/PORT_TYPES";
import LearningElementStartedUseCase from "../../../Core/Application/LearningElementStarted/LearningElementStartedUseCase";
import ILearningElementPort from "../../../Core/Ports/LearningElementPort/ILearningElementPort";

const learningElementPortMock = mock<ILearningElementPort>();
const entityContainerMock = mock<IEntityContainer>();

describe("Calculate Total Room Score UseCase", () => {
  let systemUnderTest;
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(PORT_TYPES.ILearningElementPort).toConstantValue(
      learningElementPortMock
    );
  });
  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LearningElementStartedUseCase);
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

    systemUnderTest.execute({
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
      systemUnderTest.execute({
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

    systemUnderTest.execute({
      learningElementId: 1,
    });

    // @ts-ignore TS does not know about the mock
    expect(filterReturn).toBe(false);
  });
});

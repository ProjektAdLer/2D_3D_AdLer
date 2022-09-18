import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import CalculateSpaceScoreUseCase from "../../../../Core/Application/UseCases/CalculateSpaceScore/CalculateSpaceScoreUseCase";
import SpaceEntity from "../../../../Core/Domain/Entities/SpaceEntity";
import { filterEntitiesOfTypeMockImplUtil } from "../../../TestUtils";
import ISpacePort from "../../../../Core/Ports/SpacePort/ISpacePort";

const spaceTO = { spaceId: 1 };

const spacePortMock = mock<ISpacePort>();
const entityContainerMock = mock<IEntityContainer>();

describe("Calculate Space Score UseCase", () => {
  let systemUnderTest: CalculateSpaceScoreUseCase;
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );

    CoreDIContainer.rebind(PORT_TYPES.ISpacePort).toConstantValue(
      spacePortMock
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(CalculateSpaceScoreUseCase);
  });

  test("filter Callback should return a boolean", () => {
    entityContainerMock.filterEntitiesOfType.mockImplementation(
      filterEntitiesOfTypeMockImplUtil([
        {
          id: 42,
          elements: [],
        },
      ])
    );

    systemUnderTest.execute(spaceTO);

    entityContainerMock.filterEntitiesOfType.mockReset();
  });

  it("should calculate the correct total space score", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        elements: [
          {
            hasScored: true,
            value: 10,
          },
          {
            hasScored: true,
            value: 10,
          },
          {
            hasScored: false,
            value: 10,
          },
        ],
      },
    ]);

    systemUnderTest.execute(spaceTO);

    expect(entityContainerMock.filterEntitiesOfType).toHaveBeenCalledWith(
      SpaceEntity,
      expect.any(Function)
    );

    expect(spacePortMock.presentNewScore).toHaveBeenCalledWith(
      20,
      true,
      spaceTO.spaceId
    );
  });

  it("should return 0 and false when no Elements are present", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        elements: [],
      },
    ]);

    systemUnderTest.execute(spaceTO);

    expect(spacePortMock.presentNewScore).toHaveBeenCalledWith(
      0,
      false,
      spaceTO.spaceId
    );
  });

  it("should throw an error if the space is not found", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    expect(() => {
      systemUnderTest.execute(spaceTO);
    }).toThrow();
  });
});

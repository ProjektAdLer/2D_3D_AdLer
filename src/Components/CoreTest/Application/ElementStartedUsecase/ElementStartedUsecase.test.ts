import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../Core/Domain/EntityContainer/IEntityContainer";
import { ConstructorReference } from "../../../Core/Types/EntityManagerTypes";

import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ElementStartedUseCase from "../../../Core/Application/ElementStarted/ElementStartedUseCase";
import IElementPort from "../../../Core/Ports/ElementPort/IElementPort";

const elementPortMock = mock<IElementPort>();
const entityContainerMock = mock<IEntityContainer>();

describe("Element Started Usecase", () => {
  let systemUnderTest;
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(PORT_TYPES.IElementPort).toConstantValue(
      elementPortMock
    );
  });
  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(ElementStartedUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  it("should call the presenter of the Space with the LE ", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
      },
    ]);

    systemUnderTest.execute({
      elementId: 1,
    });

    expect(elementPortMock.startElementEditing).toHaveBeenCalledWith({
      id: 1,
    });
  });

  it("should throw, if the Element is not found", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);
    expect(() => {
      systemUnderTest.execute({
        elementId: 2,
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
            elements: [],
          },
        ];
      }
    );

    systemUnderTest.execute({
      elementId: 1,
    });

    // @ts-ignore TS does not know about the mock
    expect(filterReturn).toBe(false);
  });
});

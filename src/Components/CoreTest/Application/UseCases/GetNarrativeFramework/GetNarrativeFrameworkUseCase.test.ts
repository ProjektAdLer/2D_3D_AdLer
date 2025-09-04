import { mock } from "jest-mock-extended";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import IGetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import GetNarrativeFrameworkInfoUseCase from "../../../../Core/Application/UseCases/GetNarrativeFrameworkInfo/GetNarrativeFrameworkInfoUseCase";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import Logger from "../../../../Core/Adapters/Logger/Logger";

const worldPortMock = mock<ILearningWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const loggerMock = mock<Logger>();

describe("GetNarrativeFrameworkInfoUseCase", () => {
  let systemUnderTest: GetNarrativeFrameworkInfoUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock,
    );
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase,
    ).toConstantValue(getUserLocationUseCaseMock);
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("filterEntitiesOfType callback for learning world entity filtering should return true when element exists", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({ worldID: 42 } as any);

    const learningWorldEntityMock = {
      id: 42,
      spaces: [],
      narrativeFramework: {
        introText: "intro",
        outroText: "outro",
      },
    };

    let filterResult;

    entityContainerMock.filterEntitiesOfType.mockImplementationOnce(
      (mock, callback) => {
        filterResult = callback(learningWorldEntityMock);
        return [learningWorldEntityMock];
      },
    );

    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.IGetNarrativeFrameworkInfoUseCase,
    );
    systemUnderTest.execute();

    expect(filterResult).toBe(true);
  });

  test("should call port with correct loaded narrative framework info (shownBefore false)", () => {
    const worldEntity = {
      id: 1,
      spaces: [
        {
          elements: [
            {
              hasScored: false,
            },
            {
              hasScored: false,
            },
          ],
        },
      ],
      narrativeFramework: {
        introText: "intro",
        outroText: "outro",
      },
    };
    entityContainerMock.filterEntitiesOfType.mockReturnValue([worldEntity]);
    getUserLocationUseCaseMock.execute.mockReturnValue({ worldID: 1 } as any);

    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.IGetNarrativeFrameworkInfoUseCase,
    );
    systemUnderTest.execute();

    expect(
      worldPortMock.onNarrativeFrameworkInfoLoadedOrUpdated,
    ).toHaveBeenCalledWith({
      introText: "intro",
      outroText: "outro",
      shownBefore: false,
      theme: undefined,
    });
  });
  test("should call port with correct loaded narrative framework info (shownBefore true)", () => {
    const worldEntity = {
      id: 1,
      spaces: [
        {
          elements: [
            {
              hasScored: true,
            },
            {
              hasScored: false,
            },
          ],
        },
      ],
      narrativeFramework: {
        introText: "intro",
        outroText: "outro",
      },
    };
    entityContainerMock.filterEntitiesOfType.mockReturnValue([worldEntity]);
    getUserLocationUseCaseMock.execute.mockReturnValue({ worldID: 1 } as any);

    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.IGetNarrativeFrameworkInfoUseCase,
    );
    systemUnderTest.execute();

    expect(
      worldPortMock.onNarrativeFrameworkInfoLoadedOrUpdated,
    ).toHaveBeenCalledWith({
      introText: "intro",
      outroText: "outro",
      shownBefore: true,
      theme: undefined,
    });
  });

  test("should call port with correct loaded narrative framework info (shownBefore true, but split on different rooms)", () => {
    const worldEntity = {
      id: 1,
      spaces: [
        {
          elements: [
            {
              hasScored: true,
            },
            {
              hasScored: false,
            },
          ],
        },
        {
          elements: [
            {
              hasScored: false,
            },
            {
              hasScored: false,
            },
          ],
        },
      ],
      narrativeFramework: {
        introText: "intro",
        outroText: "outro",
      },
    };
    entityContainerMock.filterEntitiesOfType.mockReturnValue([worldEntity]);
    getUserLocationUseCaseMock.execute.mockReturnValue({ worldID: 1 } as any);

    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.IGetNarrativeFrameworkInfoUseCase,
    );
    systemUnderTest.execute();

    expect(
      worldPortMock.onNarrativeFrameworkInfoLoadedOrUpdated,
    ).toHaveBeenCalledWith({
      introText: "intro",
      outroText: "outro",
      shownBefore: true,
      theme: undefined,
    });
  });

  test("should call port with correct loaded narrative framework info (no elements in space)", () => {
    const worldEntity = {
      id: 1,
      spaces: [{ elements: undefined }],
      narrativeFramework: {
        introText: "intro",
        outroText: "outro",
      },
    };
    entityContainerMock.filterEntitiesOfType.mockReturnValue([worldEntity]);
    getUserLocationUseCaseMock.execute.mockReturnValue({ worldID: 1 } as any);

    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.IGetNarrativeFrameworkInfoUseCase,
    );
    systemUnderTest.execute();

    expect(
      worldPortMock.onNarrativeFrameworkInfoLoadedOrUpdated,
    ).toHaveBeenCalledWith({
      introText: "intro",
      outroText: "outro",
      shownBefore: false,
      theme: undefined,
    });
  });

  test("calls logger and returns if there is no world entity", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);
    getUserLocationUseCaseMock.execute.mockReturnValue({ worldID: 1 } as any);

    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.IGetNarrativeFrameworkInfoUseCase,
    );
    systemUnderTest.execute();

    expect(loggerMock.log).toHaveBeenCalledWith(
      "WARN",
      `GetNarrativeFrameworkInfoUseCase: There is no worldEntity.`,
    );
    expect(
      worldPortMock.onNarrativeFrameworkInfoLoadedOrUpdated,
    ).not.toHaveBeenCalled();
  });

  test("calls logger and returns if world entity has no narrative framework", () => {
    const worldEntity = {
      id: 1,
      spaces: [],
    };
    entityContainerMock.filterEntitiesOfType.mockReturnValue([worldEntity]);
    getUserLocationUseCaseMock.execute.mockReturnValue({ worldID: 1 } as any);

    systemUnderTest = CoreDIContainer.get(
      USECASE_TYPES.IGetNarrativeFrameworkInfoUseCase,
    );
    systemUnderTest.execute();

    expect(loggerMock.log).toHaveBeenCalledWith(
      "INFO",
      `GetNarrativeFrameworkInfoUseCase: World 1 has no narrative framework.`,
    );

    expect(
      worldPortMock.onNarrativeFrameworkInfoLoadedOrUpdated,
    ).not.toHaveBeenCalled();
  });
});

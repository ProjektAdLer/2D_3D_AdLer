import RandomizeAvatarConfigUseCase from "../../../../Core/Application/UseCases/RandomizeAvatarConfig/RandomizeAvatarConfigUseCase";
import AvatarConfigTO from "../../../../Core/Application/DataTransferObjects/AvatarConfigTO";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";
import { NotificationMessages } from "../../../../Core/Domain/Types/NotificationMessages";
import BackendAdapterUtils from "src/Components/Core/Adapters/BackendAdapter/BackendAdapterUtils";

// Mock dependencies
import ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";
import INotificationPort from "../../../../Core/Application/Ports/Interfaces/INotificationPort";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import IBackendPort from "../../../../Core/Application/Ports/Interfaces/IBackendPort";
import IAvatarPort from "../../../../Core/Application/Ports/Interfaces/IAvatarPort";

// --- Mocks ---
const mockLogger: jest.Mocked<ILoggerPort> = {
  log: jest.fn(),
};
const mockNotificationPort: jest.Mocked<INotificationPort> = {
  onNotificationTriggered: jest.fn(),
};
const mockEntityContainer: jest.Mocked<IEntityContainer> = {
  getEntitiesOfType: jest.fn(),
  addEntity: jest.fn(),
  removeEntity: jest.fn(),
  getEntityById: jest.fn(),
  filterEntitiesOfType: jest.fn(),
  getAllEntities: jest.fn(),
  clear: jest.fn(),
};
const mockBackendPort: jest.Mocked<IBackendPort> = {
  updateAvatarConfig: jest.fn(),
  login: jest.fn(),
  getLearningWorld: jest.fn(),
  getLearningElement: jest.fn(),
  getLearningSpace: jest.fn(),
  scoreH5PElement: jest.fn(),
  getLearningWorlds: jest.fn(),
  setWorldCompleted: jest.fn(),
  getAvatarConfig: jest.fn(),
  getAdaptivityElement: jest.fn(),
  submitAdaptivityElementSelection: jest.fn(),
  getOverallTimeSpent: jest.fn(),
  createOverallTimeSpent: jest.fn(),
  updateOverallTimeSpent: jest.fn(),
  getUnseenBreakTimeNotifications: jest.fn(),
  getNarrativeFrameworkInfo: jest.fn(),
  getExperiencePoints: jest.fn(),
  updateExperiencePoints: jest.fn(),
};
const mockAvatarPort: jest.Mocked<IAvatarPort> = {
  onAvatarConfigChanged: jest.fn(),
  onAvatarConfigLoaded: jest.fn(),
  registerAdapter: jest.fn(),
  unregisterAdapter: jest.fn(),
  getAdapters: jest.fn(),
  name: jest.fn().mockReturnValue("MockAvatarPort"),
};

// Mock BackendAdapterUtils
// Die SUT (System Under Test) verwendet BackendAdapterUtils.convertAvatarConfigToBackendAvatarConfig
// Daher muss der Default-Export gemockt werden.
jest.mock(
  "src/Components/Core/Adapters/BackendAdapter/BackendAdapterUtils",
  () => ({
    __esModule: true,
    default: {
      convertAvatarConfigToBackendAvatarConfig: jest.fn((config) => ({
        ...config,
        converted: true,
      })),
    },
  }),
);

describe("RandomizeAvatarConfigUseCase", () => {
  let useCase: RandomizeAvatarConfigUseCase;
  let mockUserDataEntity: UserDataEntity;
  let initialAvatarConfig: AvatarConfigTO;
  let mathRandomSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    useCase = new RandomizeAvatarConfigUseCase(
      mockLogger,
      mockNotificationPort,
      mockEntityContainer,
      mockBackendPort,
      mockAvatarPort,
    );

    // Erstelle eine initiale AvatarConfigTO für Tests
    initialAvatarConfig = new AvatarConfigTO();
    initialAvatarConfig.hair = "initialHair" as any;
    initialAvatarConfig.beard = "initialBeard" as any;
    initialAvatarConfig.skinColor = {
      id: 1,
      nameKey: "InitialSkin",
      hexColor: "#111111",
      uOffset: 0.1,
      vOffset: 0.1,
    };
    initialAvatarConfig.hairColor = {
      id: 1,
      nameKey: "InitialHair",
      hexColor: "#222222",
      uOffset: 0.2,
      vOffset: 0.2,
    };
    initialAvatarConfig.roundness = 0.5;
    initialAvatarConfig.eyebrows = 1;
    initialAvatarConfig.eyes = 1;
    initialAvatarConfig.nose = 1;
    initialAvatarConfig.mouth = 1;
    initialAvatarConfig.headgear = "initialHeadgear" as any;
    initialAvatarConfig.glasses = "initialGlasses" as any;
    initialAvatarConfig.backpack = "initialBackpack" as any;
    initialAvatarConfig.other = "initialOther" as any;
    initialAvatarConfig.shirt = "initialShirt" as any;
    initialAvatarConfig.pants = "initialPants" as any;
    initialAvatarConfig.shoes = "initialShoes" as any;
    initialAvatarConfig.shirtColor = {
      id: 1,
      nameKey: "InitialShirt",
      hexColor: "#333333",
      uOffset: 0.3,
      vOffset: 0.3,
    };
    initialAvatarConfig.pantsColor = {
      id: 1,
      nameKey: "InitialPants",
      hexColor: "#444444",
      uOffset: 0.4,
      vOffset: 0.4,
    };
    initialAvatarConfig.shoesColor = {
      id: 1,
      nameKey: "InitialShoes",
      hexColor: "#555555",
      uOffset: 0.5,
      vOffset: 0.5,
    };

    mockUserDataEntity = new UserDataEntity("testUser", "testToken");
    // Wichtig: Eine tiefe Kopie für die Entity verwenden, um Seiteneffekte zwischen Tests zu vermeiden
    mockUserDataEntity.avatar = JSON.parse(JSON.stringify(initialAvatarConfig));

    mathRandomSpy = jest.spyOn(Math, "random").mockReturnValue(0.1); // Deterministisches Math.random
  });

  afterEach(() => {
    mathRandomSpy.mockRestore();
  });

  it("should log error and do nothing if no UserDataEntity is found", async () => {
    mockEntityContainer.getEntitiesOfType.mockReturnValue([]);
    await useCase.executeAsync();
    expect(mockLogger.log).toHaveBeenCalledWith(
      LogLevelTypes.ERROR,
      "No user data entity found",
    );
    expect(mockBackendPort.updateAvatarConfig).not.toHaveBeenCalled();
    expect(mockAvatarPort.onAvatarConfigChanged).not.toHaveBeenCalled();
  });

  it("should log error and do nothing if multiple UserDataEntities are found", async () => {
    mockEntityContainer.getEntitiesOfType.mockReturnValue([
      mockUserDataEntity,
      new UserDataEntity("user2", "token2"),
    ]);
    await useCase.executeAsync();
    expect(mockLogger.log).toHaveBeenCalledWith(
      LogLevelTypes.ERROR,
      "Multiple user data entities found",
    );
    expect(mockBackendPort.updateAvatarConfig).not.toHaveBeenCalled();
  });

  it("should log error, notify, and do nothing if UserDataEntity has no avatar config", async () => {
    mockUserDataEntity.avatar = undefined;
    mockEntityContainer.getEntitiesOfType.mockReturnValue([mockUserDataEntity]);
    await useCase.executeAsync();
    expect(mockLogger.log).toHaveBeenCalledWith(
      LogLevelTypes.ERROR,
      "No avatar config found in user data entity",
    );
    expect(mockNotificationPort.onNotificationTriggered).toHaveBeenCalledWith(
      LogLevelTypes.ERROR,
      "No avatar config found to randomize.",
      NotificationMessages.ELEMENT_NOT_FOUND,
    );
    expect(mockBackendPort.updateAvatarConfig).not.toHaveBeenCalled();
  });

  describe("when UserDataEntity and avatar config are valid", () => {
    beforeEach(() => {
      // Stelle sicher, dass die mockUserDataEntity für jeden Test in diesem Block frisch ist
      mockUserDataEntity.avatar = JSON.parse(
        JSON.stringify(initialAvatarConfig),
      );
      mockEntityContainer.getEntitiesOfType.mockReturnValue([
        mockUserDataEntity,
      ]);
    });

    it("should successfully randomize, update backend, and notify ports", async () => {
      mockBackendPort.updateAvatarConfig.mockResolvedValue(true);

      await useCase.executeAsync();

      const newConfig = mockUserDataEntity.avatar!;
      expect(newConfig).not.toEqual(initialAvatarConfig); // Konfiguration sollte geändert sein

      // Spezifische Prüfung für roundness, da Math.random() direkt verwendet wird
      expect(newConfig.roundness).toBe(0.1); // Da Math.random() auf 0.1 gemockt ist

      // Überprüfe, ob mindestens eine andere Eigenschaft geändert wurde (abhängig von den Daten und Math.random=0.1)
      let changed = false;
      for (const key in newConfig) {
        if (key === "roundness") continue; // roundness schon geprüft
        if (
          JSON.stringify(newConfig[key as keyof AvatarConfigTO]) !==
          JSON.stringify(initialAvatarConfig[key as keyof AvatarConfigTO])
        ) {
          changed = true;
          break;
        }
      }
      expect(changed).toBe(true);

      expect(
        BackendAdapterUtils.default.convertAvatarConfigToBackendAvatarConfig,
      ).toHaveBeenCalledWith(newConfig);
      const backendPayload = (
        BackendAdapterUtils.default
          .convertAvatarConfigToBackendAvatarConfig as jest.Mock
      ).mock.results[0].value;

      expect(mockBackendPort.updateAvatarConfig).toHaveBeenCalledWith(
        mockUserDataEntity.userToken,
        backendPayload,
      );

      expect(mockLogger.log).toHaveBeenCalledWith(
        LogLevelTypes.TRACE,
        expect.stringContaining(
          "Backend updated with randomized avatar config",
        ),
      );

      const onAvatarConfigChangedCall =
        mockAvatarPort.onAvatarConfigChanged.mock.calls[0];
      expect(onAvatarConfigChangedCall).toBeDefined();
      const [notifiedNewConfig, notifiedDiff] = onAvatarConfigChangedCall;

      expect(notifiedNewConfig).toEqual(newConfig);
      expect(notifiedNewConfig).not.toBe(newConfig); // Sollte eine Kopie sein

      expect(Object.keys(notifiedDiff).length).toBeGreaterThan(0);
      expect(notifiedDiff.roundness).toBe(newConfig.roundness); // roundness muss im Diff sein

      expect(
        mockNotificationPort.onNotificationTriggered,
      ).not.toHaveBeenCalledWith(
        LogLevelTypes.ERROR,
        expect.anything(),
        expect.anything(),
      );
    });

    it("should handle backend update failure", async () => {
      mockBackendPort.updateAvatarConfig.mockResolvedValue(false);
      const originalAvatarConfigBeforeRandomization = JSON.parse(
        JSON.stringify(mockUserDataEntity.avatar!),
      );

      await useCase.executeAsync();

      const newConfigAttempt = mockUserDataEntity.avatar!;
      // Gemäß SUT-Logik wird die Entität aktualisiert und NICHT effektiv zurückgerollt
      expect(newConfigAttempt).not.toEqual(
        originalAvatarConfigBeforeRandomization,
      );
      expect(newConfigAttempt.roundness).toBe(0.1);

      expect(
        BackendAdapterUtils.default.convertAvatarConfigToBackendAvatarConfig,
      ).toHaveBeenCalledWith(newConfigAttempt);
      const backendPayload = (
        BackendAdapterUtils.default
          .convertAvatarConfigToBackendAvatarConfig as jest.Mock
      ).mock.results[0].value;

      expect(mockBackendPort.updateAvatarConfig).toHaveBeenCalledWith(
        mockUserDataEntity.userToken,
        backendPayload,
      );

      expect(mockLogger.log).toHaveBeenCalledWith(
        LogLevelTypes.ERROR,
        "Backend update failed for randomized avatar config",
      );
      expect(mockNotificationPort.onNotificationTriggered).toHaveBeenCalledWith(
        LogLevelTypes.ERROR,
        "Failed to save randomized avatar to backend.",
        NotificationMessages.BACKEND_ERROR,
      );
      expect(mockAvatarPort.onAvatarConfigChanged).not.toHaveBeenCalled();

      // Die Avatar-Konfiguration der Entität bleibt die neue (randomisierte),
      // da userDataEntity.avatar = newAvatarConfig; vor dem Backend-Aufruf erfolgt
      // und die Zeile userDataEntity.avatar = userDataEntity.avatar; im Fehlerfall ein No-Op ist.
      expect(mockUserDataEntity.avatar).toBe(newConfigAttempt);
    });

    it("should ensure all properties remain defined after randomization (fallback test)", async () => {
      // Dieser Test prüft implizit das Fallback-Verhalten `|| currentConfig.property`
      // in `randomizeProperties`, indem sichergestellt wird, dass keine definierte Eigenschaft
      // nach der Randomisierung `undefined` wird.
      mockBackendPort.updateAvatarConfig.mockResolvedValue(true);
      await useCase.executeAsync();

      const newConfig = mockUserDataEntity.avatar!;
      for (const key in initialAvatarConfig) {
        if (initialAvatarConfig.hasOwnProperty(key)) {
          expect(newConfig[key as keyof AvatarConfigTO]).toBeDefined();
        }
      }
      expect(newConfig.roundness).toBe(0.1); // roundness ändert sich definitiv
    });
  });
});

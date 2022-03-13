import Core from "../../../Core/API/Core";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import RoomPresenter from "../../../Core/Presentation/Room/RoomPresenter";
import RoomView from "../../../Core/Presentation/Room/RoomView";
import RoomViewModel from "../../../Core/Presentation/Room/RoomViewModel";
import ScenePresenter from "../../../Core/Presentation/SceneManagment/ScenePresenter";
import { ROOMSIZE } from "../../../Core/BusinessLogic/RoomConfigurator/RoomConfigurator";
import { Color3 } from "@babylonjs/core";

describe("RoomPresenter", () => {
  let roomViewModel: RoomViewModel;

  beforeEach(() => {
    roomViewModel = CoreDIContainer.get(RoomViewModel);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("get RoomSize throws Error if roomSize is not set.", () => {
    expect(() => {
      var tmp = roomViewModel.RoomSize;
    }).toThrowError();
  });
  test("set RoomSize will set the roomSize.", () => {
    roomViewModel.RoomSize = ROOMSIZE.Small;
    var tmp = roomViewModel.RoomSize;
    expect(tmp).toBe(ROOMSIZE.Small);
  });

  test("get WallColor throws Error if wallColor is intentionally set to undefined.", () => {
    roomViewModel.WallColor = undefined;
    expect(() => {
      var tmp = roomViewModel.WallColor;
    }).toThrowError();
  });
  test("set WallColor will set the wallColor.", () => {
    roomViewModel.WallColor = new Color3(0.123, 0.123, 0.123);
    var tmp = roomViewModel.WallColor;
    expect(tmp).toEqual({ b: 0.123, g: 0.123, r: 0.123 });
  });

  test("get RoomWidth throws Error if roomWidth is intentionally set to undefined.", () => {
    roomViewModel.RoomWidth = undefined;
    expect(() => {
      var tmp = roomViewModel.RoomWidth;
    }).toThrowError();
  });
  test("set RoomWidth will set the roomWidth.", () => {
    roomViewModel.RoomWidth = 1234;
    var tmp = roomViewModel.RoomWidth;
    expect(tmp).toBe(1234);
  });

  test("get RoomLength throws Error if roomLength is intentionally set to undefined.", () => {
    roomViewModel.RoomLength = undefined;
    expect(() => {
      var tmp = roomViewModel.RoomLength;
    }).toThrowError();
  });
  test("set RoomLength will set the roomLength.", () => {
    roomViewModel.RoomLength = 12345;
    var tmp = roomViewModel.RoomLength;
    expect(tmp).toBe(12345);
  });

  test("get BaseHeight throws Error if baseHeight is intentionally set to undefined.", () => {
    roomViewModel.BaseHeight = undefined;
    expect(() => {
      var tmp = roomViewModel.BaseHeight;
    }).toThrowError();
  });
  test("set BaseHeight will set the baseHeight.", () => {
    roomViewModel.BaseHeight = 12;
    var tmp = roomViewModel.BaseHeight;
    expect(tmp).toBe(12);
  });

  test("get RoomHeight throws Error if roomHeight is intentionally set to undefined.", () => {
    roomViewModel.RoomHeight = undefined;
    expect(() => {
      var tmp = roomViewModel.RoomHeight;
    }).toThrowError();
  });
  test("set RoomHeight will set the roomHeight.", () => {
    roomViewModel.RoomHeight = 321;
    var tmp = roomViewModel.RoomHeight;
    expect(tmp).toBe(321);
  });

  test("get DoorWidth throws Error if doorWidth is intentionally set to undefined.", () => {
    roomViewModel.DoorWidth = undefined;
    expect(() => {
      var tmp = roomViewModel.DoorWidth;
    }).toThrowError();
  });
  test("set DoorWidth will set the doorWidth.", () => {
    roomViewModel.DoorWidth = 3210;
    var tmp = roomViewModel.DoorWidth;
    expect(tmp).toBe(3210);
  });

  test("get DoorHeight throws Error if doorHeight is intentionally set to undefined.", () => {
    roomViewModel.DoorHeight = undefined;
    expect(() => {
      var tmp = roomViewModel.DoorHeight;
    }).toThrowError();
  });
  test("set DoorHeight will set the doorHeight.", () => {
    roomViewModel.DoorHeight = 32101;
    var tmp = roomViewModel.DoorHeight;
    expect(tmp).toBe(32101);
  });

  test("get WallThickness throws Error if wallThickness is intentionally set to undefined.", () => {
    roomViewModel.WallThickness = undefined;
    expect(() => {
      var tmp = roomViewModel.WallThickness;
    }).toThrowError();
  });
  test("set WallThickness will set the wallThickness.", () => {
    roomViewModel.WallThickness = 101;
    var tmp = roomViewModel.WallThickness;
    expect(tmp).toBe(101);
  });
});

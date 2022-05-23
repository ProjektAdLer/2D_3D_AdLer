import { Vector3 } from "@babylonjs/core";
import DoorPresenter from "../../../../Core/Presentation/Babylon/Door/DoorPresenter";
import DoorViewModel from "../../../../Core/Presentation/Babylon/Door/DoorViewModel";

// jest.mock("../../../../../Lib/Observable.ts");

describe("DoorPresenter", () => {
  let presenter: DoorPresenter;

  beforeEach(() => {
    presenter = new DoorPresenter(new DoorViewModel());
  });

  test("constructor throws error if undefined is passed as view model", () => {
    expect(() => {
      new DoorPresenter(undefined);
    }).toThrowError();
  });

  test("openDoor sets state in view model", () => {
    presenter.openDoor();
    expect(presenter["viewModel"].isOpen.Value).toBe(true);
  });

  test("presentDoor sets position and rotation in view model", () => {
    let positionVector: Vector3 = new Vector3(1, 2, 3);
    let rotation: number = 0;
    presenter.presentDoor([positionVector, rotation]);
    expect(presenter["viewModel"].position.Value).toEqual(positionVector);
    expect(presenter["viewModel"].rotation.Value).toBe(rotation);
  });
});

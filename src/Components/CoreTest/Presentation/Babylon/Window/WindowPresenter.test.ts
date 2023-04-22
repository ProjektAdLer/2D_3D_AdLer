import { Vector3 } from "@babylonjs/core";
import WindowPresenter from "../../../../Core/Presentation/Babylon/Window/WindowPresenter";
import WindowViewModel from "../../../../Core/Presentation/Babylon/Window/WindowViewModel";

describe("WindowPresenter", () => {
  let systemUnderTest: WindowPresenter;

  beforeEach(() => {
    systemUnderTest = new WindowPresenter(new WindowViewModel());
  });

  test("constructor throws error if undefined is passed as view model", () => {
    expect(() => {
      //@ts-ignore
      new WindowPresenter(undefined);
    }).toThrowError();
  });

  test("presentWindow sets position and rotation in view model", () => {
    let positionVector: Vector3 = new Vector3(1, 2, 3);
    let rotation: number = 0;
    systemUnderTest.presentWindow([positionVector, rotation]);
    expect(systemUnderTest["viewModel"].position.Value).toEqual(positionVector);
    expect(systemUnderTest["viewModel"].rotation.Value).toBe(rotation);
  });
});

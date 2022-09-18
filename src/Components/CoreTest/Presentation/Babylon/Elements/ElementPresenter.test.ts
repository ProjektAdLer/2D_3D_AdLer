import { Vector3 } from "@babylonjs/core";
import { ElementTO } from "../../../../Core/Ports/WorldPort/IWorldPort";
import ElementPresenter from "../../../../Core/Presentation/Babylon/Elements/ElementPresenter";
import ElementViewModel from "../../../../Core/Presentation/Babylon/Elements/ElementViewModel";

jest.mock("@babylonjs/core");

const testElementTO: ElementTO = {
  id: 0,
  name: "test",
  elementData: {
    type: "h5p",
  },
};
const testVector = new Vector3(1, 2, 3);

describe("ElementPresenter", () => {
  let systemUnderTest: ElementPresenter;

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("presentElement calls the babylon engine", () => {
    systemUnderTest = new ElementPresenter(new ElementViewModel());
    systemUnderTest.presentElement(testElementTO, [testVector, 0]);

    expect(systemUnderTest["viewModel"].id).toBe(testElementTO.id);
    expect(systemUnderTest["viewModel"].position.Value).toBe(testVector);
    expect(systemUnderTest["viewModel"].rotation.Value).toBe(0);
  });

  test("presentElement throws error when no view model is set", () => {
    //@ts-ignore
    systemUnderTest = new ElementPresenter(null);
    expect(() => {
      systemUnderTest.presentElement(testElementTO, [testVector, 0]);
    }).toThrowError();
  });
});

import BUILDER_TYPES from "../../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import AvatarCameraBuilder from "../../../../Core/Presentation/Babylon/AvatarCamera/AvatarCameraBuilder";
import PresentationDirector from "../../../../Core/Presentation/PresentationBuilder/PresentationDirector";

jest.mock(
  "../../../../Core/Presentation/Babylon/AvatarCamera/AvatarCameraController"
);

describe("AvatarCamerBuilder", () => {
  let systemUnderTest: AvatarCameraBuilder;

  test("instantiating the builder doesn't throw", () => {
    systemUnderTest = new AvatarCameraBuilder();
    expect(systemUnderTest).toBeDefined();
  });

  test("using the builder doesn't throw", () => {
    let director = CoreDIContainer.get<PresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    );
    systemUnderTest = new AvatarCameraBuilder();

    expect(() => director.build(systemUnderTest)).not.toThrow();
  });
});

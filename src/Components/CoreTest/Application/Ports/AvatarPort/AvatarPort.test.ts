import { mock } from "jest-mock-extended";
import AvatarPort from "../../../../../../src/Components/Core/Application/Ports/AvatarPort/AvatarPort";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import { LocationScope } from "../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/HistoryWrapper";
import IAvatarAdapter from "../../../../Core/Application/Ports/AvatarPort/IAvatarAdapter";
import AvatarConfigTO from "../../../../Core/Application/DataTransferObjects/AvatarConfigTO";

describe("AvatarPort", () => {
  let systemUnderTest: AvatarPort;

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(AvatarPort);
  });

  test("name returns AVATR-PORT", () => {
    expect(systemUnderTest.name()).toBe("AVATAR-PORT");
  });

  test("onAvatarConfigChanged calls all registered adapters", () => {
    const adapter1 = mock<IAvatarAdapter>();
    const adapter2 = mock<IAvatarAdapter>();
    systemUnderTest.registerAdapter(adapter1, LocationScope._global);
    systemUnderTest.registerAdapter(adapter2, LocationScope._global);
    const mockAvatarConfig = mock<AvatarConfigTO>();

    systemUnderTest.onAvatarConfigChanged(mockAvatarConfig);

    expect(adapter1.onAvatarConfigChanged).toHaveBeenCalledTimes(1);
    expect(adapter2.onAvatarConfigChanged).toHaveBeenCalledTimes(1);
  });
});
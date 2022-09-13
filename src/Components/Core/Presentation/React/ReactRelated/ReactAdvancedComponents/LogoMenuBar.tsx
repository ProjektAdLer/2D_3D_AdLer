import CustomDropdown from "../ReactBaseComponents/CustomDropdown";
import StyledButton from "../ReactBaseComponents/StyledButton";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import LoadLearningWorldButton from "~ReactComponents/LearningRoomDisplay/LoadLearningWorldButton/LoadLearningWorldButton";
import FullscreenSwitch from "~ReactComponents/LearningRoomDisplay/FullscreenSwitch/FullscreenSwitch";
import MoodleLoginButton from "~ReactComponents/MoodleLoginButton/MoodleLoginButton";
import DebugPanel from "~ReactComponents/LearningRoomDisplay/DebugPanel/DebugPanel";
import engineLogo from "../../../../../../Assets/icons/adLerEngine_flat_logo_simple.svg";

export default function LogoMenuBar() {
  return (
    <CustomDropdown
      headerElement={
        <StyledButton>
          <img
            src={engineLogo}
            className="lg:w-20 md:w-16 sm:w-14"
            alt="EngineLogo"
          ></img>
        </StyledButton>
      }
      initialOpen={true}
      useAsTriggerOnly={true}
    >
      <StyledContainer className="flex flex-col bg-transparent">
        <LoadLearningWorldButton />
        <FullscreenSwitch />
        <MoodleLoginButton />
        <DebugPanel />
      </StyledContainer>
    </CustomDropdown>
  );
}

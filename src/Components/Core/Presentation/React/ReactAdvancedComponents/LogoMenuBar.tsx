import CustomDropdown from "../ReactBaseComponents/CustomDropdown";
import StyledButton from "../ReactBaseComponents/StyledButton";
import StyledContainer from "~ReactComponents/ReactBaseComponents/StyledContainer";
import LoadLearningWorldButton from "~ReactComponents/LoadLearningWorldButton/LoadLearningWorldButton";
import FullscreenSwitch from "~ReactComponents/FullscreenSwitch/FullscreenSwitch";
import MoodleLoginButton from "~ReactComponents/MoodleLoginButton/MoodleLoginButton";
import DebugPanel from "~ReactComponents/DebugPanel/DebugPanel";
import engineLogo from "../../../../../Assets/icons/adLerEngine_flat_logo_simple.svg";

export default function LogoMenuBar() {
  return (
    <CustomDropdown
      headerElement={
        <StyledButton>
          <img
            src={engineLogo}
            className="xl:w-20 lg:w-16 md:w-14 sm:w-12"
            alt="EngineLogo"
          ></img>
        </StyledButton>
      }
      initialOpen={true}
      useAsTriggerOnly={true}
    >
      <StyledContainer className="flex flex-col ml-1 bg-transparent lg:ml-2">
        <LoadLearningWorldButton />
        <FullscreenSwitch />
        <MoodleLoginButton />
        <DebugPanel />
      </StyledContainer>
    </CustomDropdown>
  );
}

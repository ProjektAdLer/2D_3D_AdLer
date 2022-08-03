import StyledContainer from "../ReactBaseComponents/StyledContainer";
import MoodleLoginButton from "../MoodleLoginButton/MoodleLoginButton";
import DebugPanel from "../DebugPanel/DebugPanel";
import LoadLearningWorldButton from "../LoadLearningWorldButton/LoadLearningWorldButton";
import FullscreenSwitch from "../FullscreenSwitch/FullscreenSwitch";

export default function MenuBar() {
  return (
    <StyledContainer className="flex flex-col ml-0">
      <LoadLearningWorldButton />
      <FullscreenSwitch />
      <MoodleLoginButton />
      <DebugPanel />
    </StyledContainer>
  );
}

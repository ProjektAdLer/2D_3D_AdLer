import LearningElementsDropdown from "../LearningElementsDropdown/LearningElementsDropdown";
import StyledButton from "../ReactBaseComponents/StyledButton";
import StyledContainer from "../ReactBaseComponents/StyledContainer";

export default function LogoMenuBar() {
  return (
    <StyledContainer className="top-0 left-0 bg-transparent flex flex-col justify-center">
      <img
        src="icons/adlerEngine_flat_logo_simple.svg"
        className="xl:w-20 lg:w-16 md:w-10 sm:w-8"
      ></img>
    </StyledContainer>
  );
}

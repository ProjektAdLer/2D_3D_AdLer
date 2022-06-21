import CustomDropdown from "../ReactBaseComponents/CustomDropdown";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import MenuBar from "./MenuBar";

export default function LogoMenuBar() {
  return (
    <StyledContainer className="fixed top-0 left-0">
      <CustomDropdown
        headerElement={
          <img
            src="icons/adlerEngine_flat_logo_simple.svg"
            className="xl:w-20 lg:w-16 md:w-10 sm:w-8"
          ></img>
        }
        initialOpen={true}
        useAsTriggerOnly={true}
      >
        <MenuBar />
      </CustomDropdown>
    </StyledContainer>
  );
}

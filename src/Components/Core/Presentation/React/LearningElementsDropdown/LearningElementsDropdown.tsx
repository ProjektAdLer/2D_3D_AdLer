import { useState } from "react";
import { LearningElementTO } from "../../../Ports/LearningWorldPort/ILearningWorldPort";
import { getIcon } from "../../Utils/GetIcon";
import useObservable from "../CustomHooks/useObservable";
import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import CustomDropdown from "../ReactBaseComponents/CustomDropdown";
import StyledButton from "../ReactBaseComponents/StyledButton";
import LearningElementsDropdownController from "./LearningElementsDropdownController";
import LearningElementsDropdownViewModel from "./LearningElementsDropdownViewModel";
import StyledContainer from "~ReactComponents/ReactBaseComponents/StyledContainer";

export default function LearningElementsDropdown() {
  const [viewModels, controllers] = useViewModelControllerProvider<
    LearningElementsDropdownViewModel,
    LearningElementsDropdownController
  >(LearningElementsDropdownViewModel);

  const [learningElements] = useObservable<LearningElementTO[]>(
    viewModels[0]?.learningElements
  );

  const [dropDownOpen, setDropDownOpen] = useState(false);
  if (learningElements?.length === 0 || !learningElements) return null;
  return (
    <CustomDropdown
      headerElement={
        <StyledButton
          shape="free"
          onClick={() => {
            setDropDownOpen(!dropDownOpen);
          }}
        >
          <h2 className="text-white text-md lg:text-2xl text-shadow">
            Lernelemente
          </h2>
        </StyledButton>
      }
      isOpen={dropDownOpen}
      managed={true}
      initialOpen
    >
      <StyledContainer className="flex flex-col gap-2">
        {learningElements?.map((element, index) => (
          <StyledButton
            key={index}
            shape="free"
            onClick={() => controllers[0]?.startLearningElement(element.id)}
          >
            <div className="w-5 lg:w-10">
              {getIcon(element.learningElementData.type)}
            </div>
            <h3 className="ml-1 text-sm text-white lg:text-lg">
              {element.name}
            </h3>
          </StyledButton>
        ))}
      </StyledContainer>
    </CustomDropdown>
  );
}

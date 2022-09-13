import { useState } from "react";
import { getIcon } from "../../../Utils/GetIcon";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import CustomDropdown from "../../ReactRelated/ReactBaseComponents/CustomDropdown";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import LearningElementsDropdownController from "./LearningElementsDropdownController";
import LearningElementsDropdownViewModel from "./LearningElementsDropdownViewModel";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import LearningElementTO from "src/Components/Core/Application/DataTransportObjects/LearningElementTO";

export default function LearningElementsDropdown() {
  const [viewModel, controller] = useBuilder<
    LearningElementsDropdownViewModel,
    LearningElementsDropdownController
  >(BUILDER_TYPES.ILearningElementsDropdownBuilder);

  const [learningElements] = useObservable<LearningElementTO[]>(
    viewModel?.learningElements
  );

  const [dropDownOpen, setDropDownOpen] = useState(false);

  if (learningElements?.length === 0 || !learningElements) return null;
  if (!controller) return null;

  return (
    <CustomDropdown
      headerElement={
        <StyledButton
          shape="freefloatleft"
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
            shape="freefloatleft"
            onClick={() => controller?.startLearningElement(element.id)}
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

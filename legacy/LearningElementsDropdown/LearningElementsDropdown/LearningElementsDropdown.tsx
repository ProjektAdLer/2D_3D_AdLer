import { useState } from "react";
import { getLearningElementIcon } from "../../../Utils/GetLearningElementIcon";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import CustomDropdown from "../../ReactRelated/ReactBaseComponents/CustomDropdown";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import LearningElementsDropdownController from "./LearningElementsDropdownController";
import LearningElementsDropdownViewModel from "./LearningElementsDropdownViewModel";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import elementsIcon from "../../../../../../Assets/icons/learning-elements.svg";

export default function LearningElementsDropdown() {
  const [viewModel, controller] = useBuilder<
    LearningElementsDropdownViewModel,
    LearningElementsDropdownController
  >(BUILDER_TYPES.ILearningElementsDropdownBuilder);

  const [elements] = useObservable<LearningElementTO[]>(viewModel?.elements);

  const [dropDownOpen, setDropDownOpen] = useState(false);

  if (elements?.length === 0 || !elements) return null;
  if (!controller) return null;

  return (
    <CustomDropdown
      headerPart={
        <StyledButton
          shape="square"
          onClick={() => {
            setDropDownOpen(!dropDownOpen);
          }}
        >
          <img className="" src={elementsIcon} alt="" />
        </StyledButton>
      }
      isOpen={dropDownOpen}
      managed={true}
      initialOpen
    >
      <StyledContainer className="flex flex-col gap-2">
        {elements?.map((element, index) => (
          <StyledButton
            key={element.name}
            shape="freefloatleft"
            onClick={() => controller?.startLearningElement(element.id)}
          >
            <div className="w-5 lg:w-10">
              {getLearningElementIcon(element.type)}
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

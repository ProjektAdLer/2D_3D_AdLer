import { useState } from "react";
import { getElementIcon } from "../../../Utils/GetIcon";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import CustomDropdown from "../../ReactRelated/ReactBaseComponents/CustomDropdown";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import ElementsDropdownController from "./ElementsDropdownController";
import ElementsDropdownViewModel from "./ElementsDropdownViewModel";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import ElementTO from "src/Components/Core/Application/DataTransferObjects/ElementTO";
import elementsIcon from "../../../../../../Assets/icons/25-elements/elements-icon.svg";

export default function ElementsDropdown() {
  const [viewModel, controller] = useBuilder<
    ElementsDropdownViewModel,
    ElementsDropdownController
  >(BUILDER_TYPES.IElementsDropdownBuilder);

  const [elements] = useObservable<ElementTO[]>(viewModel?.elements);

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
            onClick={() => controller?.startElement(element.id)}
          >
            <div className="w-5 lg:w-10">{getElementIcon(element.type)}</div>
            <h3 className="ml-1 text-sm text-white lg:text-lg">
              {element.name}
            </h3>
          </StyledButton>
        ))}
      </StyledContainer>
    </CustomDropdown>
  );
}

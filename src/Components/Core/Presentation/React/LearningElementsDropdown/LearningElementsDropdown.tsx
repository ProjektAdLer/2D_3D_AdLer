import { useState } from "react";
import { LearningElementTO } from "../../../Application/LoadWorld/ILearningWorldPort";
import { LearningComponentID } from "../../../Types/EnitityTypes";
import useObservable from "../CustomHooks/useObservable";
import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import CustomDropdown from "../ReactBaseComponents/CustomDropdown";
import StyledButton from "../ReactBaseComponents/StyledButton";
import LearningElementsDropdownController from "./LearningElementsDropdownController";
import LearningElementsDropdownViewModel from "./LearningElementsDropdownViewModel";

export default function LearningElementsDropdown() {
  const [viewModels, controllers] = useViewModelControllerProvider<
    LearningElementsDropdownViewModel,
    LearningElementsDropdownController
  >(LearningElementsDropdownViewModel);

  const [learningElements] = useObservable<LearningElementTO[]>(
    viewModels[0]?.learningElements
  );

  const getIcon = (learningElement: LearningElementTO) => {
    switch (learningElement.type) {
      case "text":
        return (
          <img className="w-10" src="icons/Zettel_darkblue_text-icon.svg"></img>
        );
      case "video":
        return (
          <img className="w-10" src="icons/video_icon_screen_button.svg"></img>
        );
      case "image":
        return <img className="w-10" src="icons/bild_icon.svg"></img>;
      case "h5p":
        return <img className="w-10" src="icons/h5p_icon.svg"></img>;
      default:
        return null;
    }
  };

  const [dropDownOpen, setDropDownOpen] = useState(false);
  return (
    <div className="top-6 left-64 fixed flex flex-col rounded-lg">
      <CustomDropdown
        headerElement={
          <StyledButton
            onClick={() => {
              setDropDownOpen(!dropDownOpen);
            }}
          >
            <h2 className="text-white text-2xl text-shadow">Lernelemente</h2>
          </StyledButton>
        }
        isOpen={dropDownOpen}
        managed={true}
        initialOpen
      >
        <ul className="flex flex-col gap-2 mt-2">
          {learningElements?.map((element, index) => (
            <li key={index}>
              <StyledButton
                className="flex items-start"
                onClick={() => controllers[0]?.startLearningElement(element.id)}
              >
                {getIcon(element)}
                <h3 className="ml-2 text-white self-center text-xl">
                  {element.name}
                </h3>
              </StyledButton>
            </li>
          ))}
        </ul>
      </CustomDropdown>
    </div>
  );
}

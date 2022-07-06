import { useState } from "react";
import { LearningElementTO } from "../../../Application/LoadWorld/ILearningWorldPort";
import { getIcon } from "../../Utils/GetIcon";
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

  const [dropDownOpen, setDropDownOpen] = useState(false);
  if (learningElements?.length === 0) return null;
  return (
    <div className="flex flex-col mt-4 lg:mt-10 rounded-lg">
      <CustomDropdown
        headerElement={
          <StyledButton
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
        <ul className="flex flex-col gap-2 mt-2 grow">
          {learningElements?.map((element, index) => (
            <li key={index} className="flex self-start">
              <StyledButton
                className="flex items-start"
                onClick={() => controllers[0]?.startLearningElement(element.id)}
              >
                <div className="lg:w-10 w-5">
                  {getIcon(element.learningElementData.type)}
                </div>
                <h3 className="ml-2 text-white self-center text-sm lg:text-lg">
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

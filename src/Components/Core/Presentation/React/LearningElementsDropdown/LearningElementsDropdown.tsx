import { useState } from "react";
import useObservable from "../CustomHooks/useObservable";
import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import StyledButton from "../ReactBaseComponents/StyledButton";
import LearningElementsDropdownController from "./LearningElementsDropdownController";
import LearningElementsDropdownViewModel from "./LearningElementsDropdownViewModel";

export default function LearningElementsDropdown() {
  const [viewModels] = useViewModelControllerProvider<
    LearningElementsDropdownViewModel,
    LearningElementsDropdownController
  >(LearningElementsDropdownViewModel);

  const [learningElementNames] = useObservable<string[]>(
    viewModels[0]?.learningElementNames
  );

  const [dropDownOpen, setDropDownOpen] = useState(false);
  return (
    <div className="top-6 left-64 fixed flex flex-col justify-end bg-adlergold rounded-lg p-2">
      <StyledButton
        onClick={() => {
          setDropDownOpen(!dropDownOpen);
        }}
      >
        <h2 className="text-white text-2xl">Lernelemente</h2>
      </StyledButton>
      <Dropdown isOpen={dropDownOpen} elements={learningElementNames} />
    </div>
  );
}

function Dropdown({
  isOpen,
  elements,
}: {
  isOpen: boolean;
  elements: string[];
}) {
  if (!isOpen) return null; // Dropdown is closed
  return (
    <ul className="flex flex-col gap-2 mt-2">
      {elements.map((elementName, index) => (
        <li key={index}>
          <StyledButton className="flex items-center">
            <img
              className="w-10"
              src="icons/video_icon_screen_button.svg"
            ></img>
            <h3 className="ml-2 text-white self-center text-xl">
              {elementName}
            </h3>
          </StyledButton>
        </li>
      ))}
    </ul>
  );
}

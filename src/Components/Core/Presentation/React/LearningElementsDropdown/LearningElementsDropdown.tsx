import { useState } from "react";
import useObservable from "../CustomHooks/useObservable";
import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import StyledButton from "../ReactBaseComponents/StyledButton";
import LearningElementsDropdownController from "./LearningElementsDropdownController";
import LearningElementsDropdownViewModel from "./LearningElementsDropdownViewModel";

export default function LearningElementsDropdown() {
  const [viewModels, controllers] = useViewModelControllerProvider<
    LearningElementsDropdownViewModel,
    LearningElementsDropdownController
  >(LearningElementsDropdownViewModel);

  const [learningElementNames] = useObservable<string[]>(
    viewModels[0]?.learningElementNames
  );

  const [dropDownOpen, setDropDownOpen] = useState(false);
  return (
    <div>
      <h2>Lernelemente</h2>
      <StyledButton
        onClick={() => {
          setDropDownOpen(!dropDownOpen);
        }}
      >
        {!dropDownOpen ? "V" : "^"}
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
    <ul>
      {elements.map((elementName, index) => (
        <li key={index}>
          <img src="icons/coin_icon.svg" className="w-10"></img>
          <h3>{elementName}</h3>
        </li>
      ))}
    </ul>
  );
}

import { useState } from "react";
import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import StyledButton from "../ReactBaseComponents/StyledButton";
import LearningElementsDropdownController from "./LearningElementsDropdownController";
import LearningElementsDropdownViewModel from "./LearningElementsDropdownViewModel";

export default function LearningElementsDropdown() {
  const [viewModels, controllers] = useViewModelControllerProvider<
    LearningElementsDropdownViewModel,
    LearningElementsDropdownController
  >(LearningElementsDropdownViewModel);

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
      <Dropdown isOpen={dropDownOpen} />
    </div>
  );
}

function Dropdown({ isOpen }: { isOpen: boolean }) {
  if (!isOpen) return null; // Dropdown is closed
  return (
    <ul>
      <li>
        <img src="icons/coin_icon.svg" className="w-10"></img>
        <h3>Lernelement 1</h3>
      </li>
      <li>
        <img src="icons/coin_icon.svg" className="w-10"></img>
        <h3>Lernelement 2</h3>
      </li>
    </ul>
  );
}

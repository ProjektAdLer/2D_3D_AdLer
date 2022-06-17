import React, { useState } from "react";
import StyledContainer from "./StyledContainer";
type Props = {
  managed?: boolean;
  isOpen?: boolean;
  headerElement?: React.ReactNode;
  children?: React.ReactNode;
  initialOpen?: boolean;
};
/**
 *
 * @param managed controlls, if the dropdown is managed by the component or not
 * @param isOpen controlls, if the dropdown is open or not (only works, of the component is managed)
 * @param headerElement the header element of the dropdown
 * @param icon the icon of the dropdown
 * @param children the content of the dropdown
 * @param initialOpen controlls, weather the dropdown is open or not on mount
 * @returns
 */

export default function Dropdown({
  isOpen = false,
  managed = false,
  headerElement,
  children,
  initialOpen = false,
}: Props) {
  const [isOpenState, setIsOpenState] = useState(initialOpen);

  const handleClick = () => {
    if (!managed) {
      setIsOpenState(!isOpenState);
    }
  };

  const shouldShowDropdown = managed ? isOpen : isOpenState;

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={handleClick}>
        {headerElement}
      </div>
      {shouldShowDropdown && <StyledContainer>{children}</StyledContainer>}
    </div>
  );
}

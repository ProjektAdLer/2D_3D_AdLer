import React, { useState } from "react";
import StyledContainer from "./StyledContainer";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";

// Type to add classname

type Props = {
  managed?: boolean;
  isOpen?: boolean;
  headerPart?: React.ReactNode;
  children?: React.ReactNode;
  initialOpen?: boolean;
  useAsTriggerOnly?: boolean;
};
/**
 * @param managed controlls, if the dropdown is managed by the component or not
 * @param isOpen controlls, if the dropdown is open or not (only works, of the component is managed)
 * @param headerPart the header element of the dropdown
 * @param icon the icon of the dropdown
 * @param children the content of the dropdown
 * @param initialOpen controlls, weather the dropdown is open or not on mount
 * @param useAsTriggerOnly The Dropdown can be used as a trigger only. It will only enable and disable its children and wont render a content container
 * @author Philipp
 */
export default function CustomDropdown({
  isOpen = false,
  managed = false,
  headerPart,
  children,
  initialOpen = false,
  useAsTriggerOnly = false,
  className,
  ...rest
}: AdLerUIComponent<Props>) {
  const [isOpenState, setIsOpenState] = useState(initialOpen);

  const handleClick = () => {
    if (!managed) {
      setIsOpenState(!isOpenState);
    }
  };

  const shouldShowDropdown = managed ? isOpen : isOpenState;
  const content = !useAsTriggerOnly ? (
    <StyledContainer>{children}</StyledContainer>
  ) : (
    children
  );

  return (
    <div className={tailwindMerge(className, "pointer-events-auto dropdown")}>
      <div className="dropdown-header" onClick={handleClick}>
        {headerPart}
      </div>
      {shouldShowDropdown && content}
    </div>
  );
}

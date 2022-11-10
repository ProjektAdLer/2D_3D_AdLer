import { useState } from "react";
import helpIcon from "../../../../../../Assets/icons/25-help/help-icon-02.svg";

export default function MenuTutorial() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="fixed right-2 top-2">
      <div
        className="flex flex-col p-1 text-white border-b-4 border-r-4 rounded-lg text-shadow bg-adlerblue-700 active:border-transparent border-adlerdarkblue"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? (
          <div className="flex flex-col items-end text-shadow-none">
            <img className="pb-2 h-14 " src={helpIcon} alt="" />
            <ul className="p-3 pl-5 list-disc">
              <li>Top Left Button gets you back to Title Screen </li>
              <li> Leftclick on a Room Button to see Details </li>
              <li>Enter unlocked Room through Button in Details</li>
              <li>Leftclick this text to minimize</li>
            </ul>
          </div>
        ) : (
          <img className="h-12 " src={helpIcon} alt="" />
        )}
      </div>
    </div>
  );
}

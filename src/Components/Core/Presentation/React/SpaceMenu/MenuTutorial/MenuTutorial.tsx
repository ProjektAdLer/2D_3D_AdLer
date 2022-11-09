import { useState } from "react";

export default function MenuTutorial() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="fixed right-2 top-2">
      <div
        className="flex flex-col text-shadow text-white p-5 bg-adlerblue-700 rounded active:border-transparent border-adlerdarkblue border-b-4 border-r-4"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? (
          <div className="text-shadow-none">
            <div className="text-shadow pb-1 font-bold">Use Guide</div>
            <ul className="pl-3 list-disc">
              <li>Top Left Button gets you back to Title Screen </li>
              <li> Leftclick on a Room Button to see Details </li>
              <li>Enter unlocked Room through Button in Details</li>
              <li>Leftclick this text to minimize</li>
            </ul>
          </div>
        ) : (
          <div className="font-bold">Use Guide</div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";

export default function MenuTutorial() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="absolute left-5 bottom-5">
      <div
        className="flex flex-col p-5 bg-white border-4 rounded border-adlerblue"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? (
          <div>
            <div className="pb-1 pl-1 font-bold">Menu Tutorial</div>
            <div>Top Left Button gets you back to Title Screen</div>
            <div>Leftclick on a Room Button to see Details</div>
            <div>Enter unlocked Room through Button in Details</div>
            <div>Leftclick this text to minimize</div>
          </div>
        ) : (
          <div className="font-bold">Menu Tutorial</div>
        )}
      </div>
    </div>
  );
}

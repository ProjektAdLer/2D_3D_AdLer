import { useState } from "react";
import helpIcon from "../../../../../../Assets/icons/25-help/help-icon-02.svg";

export default function MenuTutorial() {
  const [isOpen, setIsOpen] = useState(false);
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
            <img className="h-10 pb-2 lg:h-14 md:h-12" src={helpIcon} alt="" />
            <ul className="p-3 pl-5 list-disc ">
              <li>
                In der linken Spalte sind die Lernräume der Lernwelt aufgeführt
              </li>
              <li>
                Mit einem Klick auf einen Lernraum-Button öffnet sich in <br />{" "}
                der rechten Spalte die dazugehörige Detailansicht
              </li>
              <li>
                Ist ein Lernraum freigeschaltet, befindet sich am Ende <br />{" "}
                der Detailansicht ein Button, zum Betreten des 3D-Lernraums
              </li>
              <li>
                Mit einem Klick auf den Home Button links oben geht es zurück{" "}
                <br /> zum Startmenü
              </li>
              <li>
                Dieser Hilfetext wird über einen Klick geschlossen und <br />{" "}
                kann über den Hilfebutton rechts oben wieder geöffnet werden
              </li>
            </ul>
          </div>
        ) : (
          <img className="h-8 lg:h-12 md:h-10 " src={helpIcon} alt="" />
        )}
      </div>
    </div>
  );
}

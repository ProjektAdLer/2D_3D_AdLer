import { useState } from "react";
import helpIcon from "../../../../../../Assets/icons/26-help/help-icon.svg";

export default function MenuTutorial() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed right-2 top-2">
      <div
        className="flex flex-col p-1 text-white border-b-4 border-r-4 rounded-lg text-shadow bg-buttonbgblue active:border-transparent border-adlerdarkblue"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? (
          <div className="flex flex-col items-end leading-loose text-shadow-none">
            <div className="flex content-center justify-between w-full">
              <h1 className="pt-1 pl-4 text-xl font-bold lg:pt-2 lg:text-2xl text-shadow">
                Steuerung Menü
              </h1>
              <img
                className="h-10 pb-2 lg:h-14 md:h-12"
                src={helpIcon}
                alt=""
              />
            </div>

            <ul className="p-3 pl-5 list-disc ">
              <li>
                In der linken Spalte sind die <b> Lernräume</b> der Lernwelt
                aufgeführt
              </li>
              <li>
                Mit einem Klick auf einen Lernraum-Button öffnet sich in <br />{" "}
                der rechten Spalte die dazugehörige <b> Detailansicht</b>
              </li>
              <li>
                Ist ein Lernraum freigeschaltet, befindet sich am Ende <br />{" "}
                der Detailansicht ein Button, zum{" "}
                <b> Betreten des 3D-Lernraums</b>
              </li>
              <li>
                Mit einem Klick auf den Home Button links oben geht es zurück{" "}
                <br /> zum <b> Startmenü</b>
              </li>
              <li>
                Dieser <b> Hilfetext</b> wird über einen Klick geschlossen und{" "}
                <br /> kann über den Hilfebutton rechts oben wieder geöffnet
                werden
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

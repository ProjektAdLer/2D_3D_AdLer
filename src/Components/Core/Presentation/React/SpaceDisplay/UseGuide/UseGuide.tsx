import { useState } from "react";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import IUseGuideController from "./IUseGuideController";
import UseGuideViewModel from "./UseGuideViewModel";
import helpIcon from "../../../../../../Assets/icons/26-help/help-icon.svg";

export default function UseGuide() {
  const [viewModel, controller] = useBuilder<
    UseGuideViewModel,
    IUseGuideController
  >(BUILDER_TYPES.IUseGuideBuilder);
  const [isOpen, setIsOpen] = useState(false);

  if (!viewModel || !controller) return null;

  return (
    <div className="fixed left-2 bottom-2 max-h-3/4 z-20">
      <div
        className="flex flex-col p-1 text-white border-b-4 border-r-4 rounded-lg text-shadow bg-adlerblue-700 active:border-transparent border-adlerdarkblue "
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? (
          <div className="flex flex-col items-end overflow-auto text-shadow-none h-72 lg:h-full">
            <div className="w-full flex justify-between content-center">
              <h1 className="pl-4 pt-1 lg:pt-2 font-bold text-xl lg:text-2xl text-shadow">
                Steuerung 3D-Lernraum
              </h1>
              <img
                className="h-10 pb-2 lg:h-14 md:h-12"
                src={helpIcon}
                alt=""
              />
            </div>
            <ul className="p-3 pl-5 list-disc leading-loose">
              <li>
                Links oben befindet sich der Button um die <b>MenüBar</b> zu
                öffnen
              </li>
              <li>
                In der <b>Menübar</b> gibt es folgende Möglichkeiten:
              </li>
              <li className="pl-4">Auf Vollbild wechseln</li>
              <li className="pl-4">Zurück zum Lernwelt-Menü gelangen</li>
              <li className="pl-4">Das Lernziel des Lernraums einsehen</li>
              <li className="pl-4">Die Lernelemente als Auflistung ansehen</li>
              <li>
                Oben in der Mitte steht der <b>Titel des Lernraums</b>{" "}
              </li>
              <li>
                Rechts oben sind die aktuell erreichten und die erforderlichen
                <b> Punkte</b> zum Abschluss des Lernraums aufgeführt
              </li>
              <li>
                Mit einem Rechtsklick auf einen Bereich des Bodens bewegt sich
                der <b>Avatar</b>
              </li>
              <li>
                Mit gedrückter rechter Maustaste und Mausbewegung dreht sich die
                <b> Ansicht</b>
              </li>
              <li>
                Über das Mausrad lässt sich die <b>Ansicht</b> vergrößern und
                verkleinern
              </li>
              <li>
                Wird mit der Maus auf ein Lernelement gefahren, erscheinen unten
                im Bildschirm <b>Detailinformationen</b>
              </li>
              <li>
                Mit einem Linksklick auf das Lernelement öffnet sich die
                dazugehörige <b>2D-Ansicht</b>
              </li>
              <li>
                Über das Kreuz in der <b>2D-Ansicht</b> lässt sich diese wieder
                schließen
              </li>
              <li>
                Für geöffnete und gelöste <b>Lernelemente</b> gibt es Punkte
              </li>
              <li>
                Bei <b>Abschluss des Lernraums</b> erscheint ein
                Abschlussfenster
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

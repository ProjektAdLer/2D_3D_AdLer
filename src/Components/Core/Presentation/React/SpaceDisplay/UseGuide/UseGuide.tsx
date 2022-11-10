import { useState } from "react";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import IUseGuideController from "./IUseGuideController";
import UseGuideViewModel from "./UseGuideViewModel";
import helpIcon from "../../../../../../Assets/icons/25-help/help-icon-02.svg";

export default function UseGuide() {
  const [viewModel, controller] = useBuilder<
    UseGuideViewModel,
    IUseGuideController
  >(BUILDER_TYPES.IUseGuideBuilder);
  const [isOpen, setIsOpen] = useState(false);

  if (!viewModel || !controller) return null;

  return (
    <div className="fixed left-2 bottom-2 max-h-3/4">
      <div
        className="flex flex-col p-1 text-white border-b-4 border-r-4 rounded-lg text-shadow bg-adlerblue-700 active:border-transparent border-adlerdarkblue "
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? (
          <div className="flex flex-col items-end overflow-auto text-shadow-none h-72 lg:h-full">
            <img className="h-10 pb-2 lg:h-14 md:h-12" src={helpIcon} alt="" />
            <ul className="p-3 pl-5 list-disc ">
              <li>
                Links oben befindet sich der Button um die MenüBar zu öffnen
              </li>
              <li>In der Menübar gibt es folgende Möglichkeiten:</li>
              <li>Auf Vollbild wechseln</li>
              <li>Zurück zum Lernwelt-Menü gelangen</li>
              <li>Das Lernziel des Lernraums einsehen</li>
              <li>Die Lernelemente als Auflistung ansehen</li>
              <li>Oben in der Mitte steht der Titel des Lernraums</li>
              <li>
                Rechts oben sind die aktuell erreichten und die erforderlichen
                Punkte zum Abschluss des Lernraums aufgeführt
              </li>
              <li>
                Mit einem Rechtsklick auf einen Bereich des Bodens bewegt sich
                der Avatar
              </li>
              <li>
                Mit gedrückter rechter Maustaste und Mausbewegung dreht sich die
                Kamera
              </li>
              <li>
                Über das Mausrad lässt sich die Ansicht rein- und rauszoomen
              </li>
              <li>
                Wird mit der Maus auf ein Lernelement gefahren, erscheinen unten
                im Bildschirm Detailinformationen
              </li>
              <li>
                Mit einem Linksklick auf das Lernelement öffnet sich die
                dazugehörige 2D-Ansicht
              </li>
              <li>
                Über das Kreuz in der 2D-Ansicht lässt sich diese wieder
                schließen
              </li>
              <li>Für geöffnete und gelöste Lernelemente gibt es Punkte</li>
              <li>
                Bei Abschluss des Lernraums erscheint ein Abschlussfenster
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

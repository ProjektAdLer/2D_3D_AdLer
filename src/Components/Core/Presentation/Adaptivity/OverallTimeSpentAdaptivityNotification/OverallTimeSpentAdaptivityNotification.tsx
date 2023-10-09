import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import IOverallTimeSpentAdaptivityNotificationController from "./IOverallTimeSpentAdaptivityNotificationController";
import OverallTimeSpentAdaptivityNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "src/Components/Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import { AdLerUIComponent } from "../../../Types/ReactTypes";
import tailwindMerge from "../../Utils/TailwindMerge";

export default function OverallTimeSpentAdaptivityNotification({
  className,
}: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    OverallTimeSpentAdaptivityNotificationViewModel,
    IOverallTimeSpentAdaptivityNotificationController
  >(BUILDER_TYPES.IOverallTimeSpentAdaptivityNotificationBuilder);

  const [showModal] = useObservable(viewModel?.showModal);
  const [breakType] = useObservable(viewModel?.breakType);

  if (!viewModel || !controller || !showModal || !breakType) return null;

  return (
    <StyledModal
      className={tailwindMerge(className, "")}
      showModal={showModal}
      onClose={() => controller.closeBreakNotification()}
    >
      {GetNotificationModalContents(breakType)}
    </StyledModal>
  );
}

function GetNotificationModalContents(
  breakType: OverallTimeSpentAdaptivityNotificationBreakType
) {
  switch (breakType) {
    case OverallTimeSpentAdaptivityNotificationBreakType.Short:
      return ShortBreakContent();
    case OverallTimeSpentAdaptivityNotificationBreakType.Medium:
      return MediumBreakContent();
    case OverallTimeSpentAdaptivityNotificationBreakType.Long:
      return LongBreakContent();
    case OverallTimeSpentAdaptivityNotificationBreakType.None:
    default:
      return "";
  }
}

function ShortBreakContent() {
  return (
    <div data-testid="short-break" className="max-w-2xl px-4 pb-4">
      <h1 className="text-xl">Sind Pausen wirklich Zeitverschwendung…?</h1>
      <br />
      <p className="text-justify">
        Wenn man nur die Menge der Zeit betrachtet, die man mit geplanten Pausen
        verbringt, scheint es so, als würde man Zeit verschwenden und die
        verbleibende Lernzeit reduzieren. Aber wenn wir die Qualität der Zeit
        berücksichtigen, ändert sich die Situation grundlegend. Nach einer Pause
        arbeiten wir oft viel effizienter, sodass die insgesamt verfügbare Zeit
        besser genutzt wird, obwohl sie objektiv betrachtet kürzer ist. Das
        bedeutet, dass die scheinbar "verlorene" Zeit während der Pause durch
        die gesteigerte Effizienz danach mehr als ausgeglichen wird.
      </p>
      <br />
      <p className="text-justify">
        Der Versuch, die verfügbare Zeit bis an die Grenze auszunutzen, indem
        man ohne Pausen lernt, ist von vornherein zum Scheitern verurteilt.
        Pausen sollten nicht trotz Zeitdruck, sondern gerade wegen Zeitmangels
        eingeplant werden, da sie letztendlich die Effizienz steigern und die
        Lernerfolge verbessern können.
      </p>
      <br />
      <p className="text-xs">
        (Hofmann, Eberhardt; Löhle, Monika (2012): Erfolgreich Lernen:
        effiziente Lern- und Arbeitsstrategien für Schule, Studium und Beruf.
        2., neu ausgestattete Aufl., Hogrefe, Göttingen. S. 83ff.)
      </p>
    </div>
  );
}

function MediumBreakContent() {
  return (
    <div data-testid="medium-break">
      <p>Du arbeitest seit 90 Minuten.</p>
      <p>Mach doch mal 15min Kaffepause!</p>
    </div>
  );
}

function LongBreakContent() {
  return (
    <div data-testid="long-break">
      <p>Du arbeitest seit 3 Stunden.</p>
      <p>Mach doch erstmal etwas komplett anderes!</p>
    </div>
  );
}

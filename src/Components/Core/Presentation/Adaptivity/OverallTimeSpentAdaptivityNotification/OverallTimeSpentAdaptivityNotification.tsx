import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import IOverallTimeSpentAdaptivityNotificationController from "./IOverallTimeSpentAdaptivityNotificationController";
import OverallTimeSpentAdaptivityNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "src/Components/Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import { AdLerUIComponent } from "../../../Types/ReactTypes";
import tailwindMerge from "../../Utils/TailwindMerge";
import exampleBreakPicture from "../../../../../Assets/prototype/breakPictureExample.png";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function OverallTimeSpentAdaptivityNotification({
  className,
}: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    OverallTimeSpentAdaptivityNotificationViewModel,
    IOverallTimeSpentAdaptivityNotificationController
  >(BUILDER_TYPES.IOverallTimeSpentAdaptivityNotificationBuilder);

  const [showModal] = useObservable(viewModel?.showModal);
  const [showMinimizedModal] = useObservable(viewModel?.showMinimizedModal);
  const [breakType] = useObservable(viewModel?.breakType);

  if (!viewModel || !controller || !showModal || !breakType) return null;

  if (showMinimizedModal)
    return (
      <StyledContainer
        className={
          tailwindMerge(`${className}`) +
          "flex flex-row-reverse bottom-1.5 right-1.5 bg-buttonbgblue rounded-lg"
        }
      >
        <StyledButton
          onClick={() => controller.closeBreakNotification()}
          className="w-8 h-8 p-1 text-xs roboto-black xl:w-10 xl:h-10 lg:w-10 lg:h-10 md:w-10 md:h-10 sm:w-10 sm:h-10"
        >
          X
        </StyledButton>
        <div
          className="flex flex-col items-center justify-center gap-2"
          onClick={() => controller.minimizeOrMaximizeBreakNotification()}
        >
          <p className="text-center underline">Pausenempfehlung</p>
          <p className="text-center">Klicke hier um mehr zu erfahren!</p>
        </div>
      </StyledContainer>
    );

  return (
    <StyledModal
      className={tailwindMerge(className, "")}
      showModal={showModal}
      onClose={() => controller.minimizeOrMaximizeBreakNotification()}
      title="Überschrift für Pausenhinweis"
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
    default:
      return "";
  }
}

function ShortBreakContent() {
  return (
    <div data-testid="short-break" className="max-w-2xl px-4 pb-4">
      <p>
        Sie haben nun 30 Minuten am Stück mit AdLer gelernt. Wie wäre es denn
        mit einer 5-minütigen Pause? Schauen Sie sich doch zur Aufheiterung
        folgendes Video an:
      </p>
      <br />
      <iframe
        className="w-full rounded-lg aspect-video"
        src="https://www.youtube.com/embed/IBM_83A9bP0?si=VkRPLViEAUti3cql"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

function MediumBreakContent() {
  return (
    <div data-testid="medium-break" className="max-w-2xl px-4 pb-4">
      <p className="text-justify">
        THIS IS A MEDIUM BREAK MESSAGE! Sie haben nun 4 Stunden am Stück im
        AdLer-System gelernt und gearbeitet. Wir würden Ihnen eine längere Pause
        von mindestens 90 Minuten empfehlen. Wie wäre es denn mit einem
        Spaziergang? Spaziergänge sind eine einfache, aber äußerst wirkungsvolle
        Möglichkeit, Körper und Geist zu entspannen. Sie bieten eine Vielzahl
        von gesundheitlichen Vorteilen und können sogar kreatives Denken
        fördern. Hier sind einige der wichtigsten Gründe, warum regelmäßige
        Spaziergänge eine wertvolle Ergänzung zu unserem Alltag sind: <br />
        <ul className="pl-4 list-disc">
          <li className="pt-4">
            <b>Körperliche Gesundheit:</b> Spaziergänge sind eine ausgezeichnete
            Form der körperlichen Aktivität. Sie fördern die Herzgesundheit,
            verbessern die Durchblutung und stärken die Muskulatur. Außerdem
            können sie helfen, das Risiko von Herz-Kreislauf-Erkrankungen zu
            reduzieren. Stressabbau und Entspannung: Während eines Spaziergangs
            haben wir die Möglichkeit, uns von Stress und Anspannung zu
            befreien. Die Bewegung und die frische Luft helfen, Stresshormone
            abzubauen und das allgemeine Wohlbefinden zu steigern.{" "}
          </li>
          <li className="pt-4">
            <b>Steigerung der Kreativität: </b> Studien zeigen, dass
            Spaziergänge die Kreativität und das Denkvermögen steigern können.
            Die Verbindung mit der Natur und die Veränderung der Umgebung können
            neue Perspektiven eröffnen und zu innovativem Denken anregen.{" "}
          </li>
          <li className="pt-4">
            <b>Verbesserung der mentalen Gesundheit: </b> Regelmäßige
            Spaziergänge können die Stimmung verbessern und bei der Bewältigung
            von Depressionen und Angstzuständen helfen. Die Bewegung im Freien
            und der Kontakt zur Natur haben nachweislich positive Auswirkungen
            auf das seelische Wohlbefinden.{" "}
          </li>
          <li className="pt-4">
            {" "}
            <b> Gewichtskontrolle und Stoffwechsel: </b> Spaziergänge sind eine
            effektive Möglichkeit, den Stoffwechsel anzukurbeln und können dazu
            beitragen, ein gesundes Körpergewicht zu halten oder zu erreichen.
            Sie sind eine niedrigschwellige Form der Bewegung, die für viele
            Menschen leicht zugänglich ist.{" "}
          </li>
          <li className="pt-4">
            {" "}
            <b>Verbesserung der Konzentration und Aufmerksamkeit: </b> Ein
            kurzer Spaziergang kann helfen, den Fokus wiederzuerlangen und die
            Aufmerksamkeit zu verbessern. Dies ist besonders nützlich, wenn man
            sich nach einer längeren Phase der Bildschirmarbeit erschöpft fühlt.
          </li>
        </ul>
      </p>
      <br />
      <p className="text-xs">
        National Institute for Health and Care Excellence. (2012). "Physical
        activity: walking and cycling." Bratman, G. N. et al. (2015). "Nature
        experience reduces rumination and subgenual prefrontal cortex
        activation." Proceedings of the National Academy of Sciences, 112(28),
        8567-8572. American Heart Association. (2018). "American Heart
        Association Recommendations for Physical Activity in Adults and Kids".
      </p>
    </div>
  );
}

function LongBreakContent() {
  return (
    <div data-testid="long-break" className="max-w-2xl px-4 pb-4">
      <div className="justify-center gap-4 lg:flex ">
        <img src={exampleBreakPicture} alt="" className="" />
        <div>
          <p className="text-justify">
            Sie haben nun 30 Minuten am Stück mit AdLer gelernt. Wie wäre es
            denn mit einer 5-minütigen Pause? Auf dem Bild sehen Sie eine kurze
            Übung zur Mobilisation.
          </p>
          <br />
          <p className="text-justify">
            Wadenmuskulatur dehnen: Stützen Sie sich in Schrittstellung mit den
            Händen an einer Wand ab. Der Abstand der Füße sollte zwei bis drei
            Schrittlängen sein. Verlagern Sie das vordere Knie langsam zur Wand,
            Oberkörper aufrecht, die Ferse zum Boden. 15–20 Sekunden pro Seite.
          </p>
        </div>
      </div>

      <br />
      <p className="text-xs">BGHW (2022). "Langes Stehen und Sitzen im Job?”</p>
    </div>
  );
}

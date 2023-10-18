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
import pauseIcon from "../../../../../Assets/icons/42-pause-icon/47-pause-icon-nobg.svg";

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
      <div>
        <StyledButton
          shape="freefloatleft"
          onClick={() => controller.minimizeOrMaximizeBreakNotification()}
          className="!hidden lg:flex fixed left-2 bottom-2"
        >
          <img src={pauseIcon} className="h-12" alt="" />
          <div className="pl-4 pr-2 flex flex-col items-start">
            <h1 className="text-xl font-bold">Zeit für eine Pause!</h1>
            <p className="text-sm">Klicke für mehr Informationen</p>
          </div>
          <div
            className="place-self-start flex items-center justify-center border-t-[1px] border-l-[1px] border-b-4 border-r-4 border-adlerdarkblue rounded-lg px-1.5"
            onClick={() => controller.closeBreakNotification()}
          >
            x
          </div>
        </StyledButton>
        <StyledButton className="fixed lg:hidden left-2 bottom-2">
          <img src={pauseIcon} className="h-fit" alt="" />
        </StyledButton>
      </div>
    );
  /*     onClick={() => controller.closeBreakNotification()}


    */

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
    case OverallTimeSpentAdaptivityNotificationBreakType.None:
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
        Sie haben nun 4 Stunden am Stück im AdLer-System gelernt und gearbeitet.
        Wir würden Ihnen eine längere Pause von mindestens 90 Minuten empfehlen.
        Wie wäre es denn mit einem Spaziergang? Spaziergänge sind eine einfache,
        aber äußerst wirkungsvolle Möglichkeit, Körper und Geist zu entspannen.
        Sie bieten eine Vielzahl von gesundheitlichen Vorteilen und können sogar
        kreatives Denken fördern. Hier sind einige der wichtigsten Gründe, warum
        regelmäßige Spaziergänge eine wertvolle Ergänzung zu unserem Alltag
        sind: <br />
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

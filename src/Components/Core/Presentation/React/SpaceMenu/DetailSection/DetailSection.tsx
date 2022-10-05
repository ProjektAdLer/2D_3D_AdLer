import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import CheckBoxEntry from "./CheckBoxEntry";
import DetailSectionViewModel from "./DetailSectionViewModel";
import spaceIcon from "../../../../../../Assets/icons/lernraum_icon.svg";
import textIcon from "../../../../../../Assets/icons/06-text/text-icon-gold.svg";
import imageIcon from "../../../../../../Assets/icons/04-image/image-icon.svg";
import videoIcon from "../../../../../../Assets/icons/07-video/video-icon.svg";
import h5pIcon from "../../../../../../Assets/icons/05-h5p/h5p-icon.svg";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import { ElementTypeStrings } from "../../../Babylon/Elements/Types/ElementTypes";

export default function DetailSection() {
  const [viewModel] = useBuilder<DetailSectionViewModel, undefined>(
    BUILDER_TYPES.IDetailSectionBuilder
  );

  const [name] = useObservable<string>(viewModel.name);
  const [description] = useObservable<string>(viewModel.description);
  const [goals] = useObservable<string>(viewModel.goals);
  const [elements] = useObservable<[ElementTypeStrings, string][]>(
    viewModel.elements
  );
  const [requiredPoints] = useObservable<number>(viewModel.requiredPoints);
  // const [includedPoints] = useObservable<number>(viewModel.includedPoints);
  const [requirements] = useObservable<[boolean, string][]>(
    viewModel.requirements
  );

  if (name === undefined || description === undefined || elements === undefined)
    return null;

  return (
    <div className="grid w-[100%] justify-start">
      <div className="flex flex-row items-center p-1 rounded-lg">
        <img
          src={spaceIcon}
          className="xl:w-8 lg:w-6 md:w-2 sm:w-2"
          alt="Lernraum-Icon"
        ></img>
        <div className="ml-2 text-2xl text-white roboto-black text-shadow">
          {name}
        </div>
      </div>

      {description !== "" && (
        <div>
          <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
            Beschreibung:
          </div>
          <div className="items-start ml-6 text-lg roboto-regular">
            {description}
          </div>
        </div>
      )}
      {goals !== "" && (
        <div>
          <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
            Lernziele:
          </div>
          <div className="items-start ml-6 text-lg roboto-regular">{goals}</div>
        </div>
      )}
      {elements.length > 0 && (
        <div>
          <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
            Lernelemente:
          </div>
          <div className="items-start ml-6 text-lg roboto-regular">
            {elements.map((content) => {
              const icon = getElementIcon(content[0]);
              return (
                <div key={content[1]} className="flex flex-row">
                  <img
                    src={icon}
                    className="p-1 xl:w-8 lg:w-6 md:w-2 sm:w-2"
                    alt="Element-Icon"
                  ></img>
                  <div>{" " + content[1] + " (" + content[0] + ")"}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {!!requiredPoints && (
        <div>
          <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
            Benötigte Punkte:
          </div>
          <div className="items-start ml-6 text-lg roboto-regular">
            {requiredPoints}
          </div>
        </div>
      )}
      {/* {includedPoints && (
        <div>
          <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
            Maximal erreichbare Punkte:
          </div>
          <div className="items-start ml-6 text-lg roboto-regular">
            {includedPoints}
          </div>
        </div>
      )} */}
      {requirements.length > 0 && (
        <div>
          <div className="self-center ml-2 text-lg text-white roboto-black text-shadow">
            Benötigte Räume zur Freischaltung:
          </div>
          <div className="items-start ml-6 text-lg roboto-regular">
            {requirements.map((requirement) => {
              return (
                <CheckBoxEntry
                  key={requirement[1]}
                  checked={requirement[0]}
                  text={requirement[1]}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
  function getElementIcon(type: ElementTypeStrings) {
    switch (type) {
      case "text":
        return textIcon;
      case "image":
        return imageIcon;
      case "video":
        return videoIcon;
      case "h5p":
        return h5pIcon;
      default:
        return h5pIcon;
    }
  }
}

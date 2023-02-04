import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import WorldDetailViewModel, {
  WorldDetailWorldData,
} from "./WorldDetailViewModel";
import worldIcon from "../../../../../../Assets/icons/14-world/world-icon-nobg.svg";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import WorldDetailController from "./WorldDetailController";
import TextWithLineBreaks from "~ReactComponents/ReactRelated/ReactBaseComponents/TextWithLineBreaks";

export default function WorldDetail() {
  const [viewModel, controller] = useBuilder<
    WorldDetailViewModel,
    WorldDetailController
  >(BUILDER_TYPES.IDetailSectionBuilder);

  const [name] = useObservable<string>(viewModel.name);
  const [description] = useObservable<string>(viewModel.description);
  const [goals] = useObservable<string>(viewModel.goals);
  const [spaceCount] = useObservable<number>(viewModel.spaceCount);

  // return if any of the observables is undefined
  if (name === undefined || description === undefined || goals === undefined)
    return null;

  return (
    <div className="flex flex-col gap-2 w-[100%] overflow-auto">
      <div className="flex flex-row items-center p-1 pb-4 border-b border-gray-500">
        <img src={worldIcon} className="w-6 xl:w-8" alt="Lernwelt-Icon"></img>
        <div className="ml-2 text-lg text-white lg:text-2xl roboto-black text-shadow">
          {name}
        </div>
      </div>

      {description !== "" && (
        <div className="pb-2 border-b border-gray-500">
          <div className="self-center ml-2 text-white lg:mb-2 roboto-black text-shadow">
            Beschreibung:
          </div>
          <div className="items-start ml-6 roboto-regular">
            <TextWithLineBreaks text={description} />
          </div>
        </div>
      )}
      {goals !== "" && (
        <div className="pb-2 border-b border-gray-500">
          <div className="self-center ml-2 text-white lg:mb-2 roboto-black text-shadow">
            Lernziele:
          </div>
          <div className="items-start ml-6 lg:text:lg roboto-regular">
            <TextWithLineBreaks text={goals} />
          </div>
        </div>
      )}
      <div className="pb-2 border-b border-gray-500">
        <div className="self-center ml-2 text-white lg:mb-2 roboto-black text-shadow">
          Anzahl Räume:
        </div>
        <div className="items-start ml-6 lg:text:lg roboto-regular">
          {spaceCount} Räume
        </div>
      </div>

      <StyledButton
        shape="freefloatleft"
        className="self-center mt-2 mb-2 justify-self-center"
        onClick={controller.onEnterWorldButtonClicked}
      >
        {"Lernwelt '" + name + "' öffnen!"}
      </StyledButton>
    </div>
  );
}

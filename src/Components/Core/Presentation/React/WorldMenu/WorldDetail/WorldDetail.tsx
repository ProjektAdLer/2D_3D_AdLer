import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import WorldDetailViewModel, {
  WorldDetailSpaceData,
} from "./WorldDetailViewModel";
import worldIcon from "../../../../../../Assets/icons/14-world/world-icon-nobg.svg";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import TextWithLineBreaks from "~ReactComponents/ReactRelated/ReactBaseComponents/TextWithLineBreaks";
import IWorldDetailController from "./IWorldDetailController";
import greenSwosh from "../../../../../../Assets/icons/17-1-solution-check/check-solution-icon-nobg.svg";
import spaceIcon from "../../../../../../Assets/icons/13-space/space-icon-nobg.svg";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";

export default function WorldDetail({ className }: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    WorldDetailViewModel,
    IWorldDetailController
  >(BUILDER_TYPES.IWorldDetailBuilder);

  const [name] = useObservable<string>(viewModel.name);
  const [description] = useObservable<string>(viewModel.description);
  const [goals] = useObservable<string>(viewModel.goals);
  const [spaces] = useObservable<WorldDetailSpaceData[]>(viewModel.spaces);

  // return if any of the observables is undefined
  if (name === undefined || name === "") return null;

  return (
    <div
      className={tailwindMerge(
        className,
        "flex flex-col gap-2 w-[100%] overflow-auto"
      )}
    >
      <div className="flex flex-row items-center justify-between p-1 pb-4 border-b border-gray-500">
        <div className="flex flex-row">
          <img src={worldIcon} className="w-6 xl:w-8" alt="Lernwelt-Icon"></img>
          <div className="ml-2 text-lg text-adlerdarkblue lg:text-2xl roboto-black">
            {name}
          </div>
        </div>
        <StyledButton
          shape="freefloatleft"
          className="self-center mt-2 mb-2 justify-self-center"
          onClick={controller.onEnterWorldButtonClicked}
        >
          {"Lernwelt öffnen!"}
        </StyledButton>
      </div>
      <div className="flex flex-col gap-2 w-[100%] overflow-auto">
        {description === undefined ||
          (description !== "" && (
            <div className="pb-2 border-b border-gray-500">
              <div className="self-center ml-2 text-adlerdarkblue lg:mb-2 roboto-black">
                Beschreibung:
              </div>
              <div className="items-start ml-6 roboto-regular">
                <TextWithLineBreaks text={description} />
              </div>
            </div>
          ))}
        {goals === undefined ||
          (goals !== "" && (
            <div className="pb-2 border-b border-gray-500">
              <div className="self-center ml-2 text-adlerdarkblue lg:mb-2 roboto-black">
                Lernziele:
              </div>
              <div className="items-start ml-6 lg:text:lg roboto-regular">
                <TextWithLineBreaks text={goals} />
              </div>
            </div>
          ))}
        <div className="pb-2 border-b border-gray-500">
          <div className="self-center ml-2 text-adlerdarkblue lg:mb-2 roboto-black">
            Räume:
          </div>
          <div className="items-start ml-6 lg:text:lg roboto-regular">
            {spaces?.map((space) => {
              return (
                <div key={space.id}>
                  <div className="flex flex-row items-center lg:text-lg">
                    <div className="relative flex my-2 ml-2">
                      <img
                        src={spaceIcon}
                        alt=""
                        className="w-8 mr-4 xl:w-12"
                      />
                      {space.isCompleted && (
                        <img
                          src={greenSwosh}
                          alt=""
                          className="absolute w-6 bottom-3 left-4 xl:w-8 xl:left-6 xl:bottom-4"
                        />
                      )}
                    </div>
                    <div className="pl-2">{space.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="pb-2 border-b border-gray-500">
          <div className="self-center ml-2 text-adlerdarkblue lg:mb-2 roboto-black">
            Anzahl Räume:
          </div>
          <div className="items-start ml-6 lg:text:lg roboto-regular">
            {spaces?.length}
          </div>
        </div>
      </div>
    </div>
  );
}

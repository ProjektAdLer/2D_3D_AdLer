import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import DebugPanelController from "./DebugPanelController";
import DebugPanelViewModel, { MiscEntries } from "./DebugPanelViewModel";

export default function DebugPanel() {
  const [viewModel] = useBuilder<DebugPanelViewModel, DebugPanelController>(
    BUILDER_TYPES.IDebugPanelBuilder
  );

  const [moodleToken] = useObservable<string>(viewModel?.moodleToken);
  const [miscItems] = useObservable<MiscEntries>(viewModel?.misc);

  return (
    /*
    Hi Daniel,
    das div "trennungsstrich" soll ein horizontaler Strich sein, um Kategoreieren voneinander zu trennen.(also zum beispiel Moodle und Babylon informationen)

    kann auch gerne in dem debug menü unter dem adler logo versteckt sein. Sollte aber fix an der links unteren ecke sein, da die informationen teilweise recht lang sind.
    */
    <div className="fixed bottom-0 left-0 p-2 m-2 text-xs font-light text-white rounded-lg lg:text-md text-shadow-sm bg-slate-400">
      <ul>
        <li>Moodle Token: {moodleToken}</li>
        <div className="trennungsstrich h-[1px] m-2 bg-white"></div>
        {miscItems?.map((item) => (
          <li key={item.key}>
            {item.key}: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
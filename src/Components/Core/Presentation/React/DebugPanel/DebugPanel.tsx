import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import div from "../ReactBaseComponents/StyledContainer";
import DebugPanelController from "./DebugPanelController";
import DebugPanelViewModel from "./DebugPanelViewModel";

export default function DebugPanel() {
  const [viewModels, controllers] = useViewModelControllerProvider<
    DebugPanelViewModel,
    DebugPanelController
  >(DebugPanelViewModel);
  return (
    /*
    Hi Daniel,
    das div "trennungsstrich" soll ein horizontaler Strich sein, um Kategoreieren voneinander zu trennen.(also zum beispiel Moodle und Babylon informationen)

    kann auch gerne in dem debug menü unter dem adler logo versteckt sein
    */
    <div>
      <ul>
        <li>Eintrag 1</li>
        <li>Eintrag 2</li>
        <li>Eintrag 3</li>
        <li>Eintrag 4</li>
        <div className="trennungsstrich"></div>
      </ul>
    </div>
  );
}

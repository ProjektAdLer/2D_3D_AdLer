import { useInjection } from "inversify-react";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import ILearningElementPanelPresenter from "./ILearningElementPanelPresenter";
import LearningElementPanel from "./LearningElementPanel";
import LearningElementPanelPresenter from "./LearningElementPanelPresenter";
import LearningElementPanelViewModel from "./LearningElementPanelViewModel";

export default function LearningElementPanelContainer() {
  let panels: ILearningElementPanelPresenter[] = [];

  // panels.length = 3;
  // panels.fill(
  //   useInjection<ILearningElementPanelPresenter>(
  //     CORE_TYPES.ILearningElementPanelPresenter
  //   ),
  //   0,
  //   panels.length
  // );

  for (let index = 0; index < 3; index++) {
    panels.push(
      new LearningElementPanelPresenter(new LearningElementPanelViewModel())
    );
  }

  return (
    <div className="le-panel-container fixed top-0 left-0 flex-col gap-4 m-5 w-120px max-h-full">
      {panels.map((panel, index) => (
        <LearningElementPanel key={index} presenter={panel} />
      ))}
    </div>
  );
}

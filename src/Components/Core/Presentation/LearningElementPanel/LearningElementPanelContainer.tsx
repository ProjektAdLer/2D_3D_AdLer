import useViewModelProvider from "../ViewModelProvider/useViewModelProvider";
import LearningElementPanel from "./LearningElementPanel";
import LearningElementPanelViewModel from "./LearningElementPanelViewModel";

export default function LearningElementPanelContainer() {
  const viewModels = useViewModelProvider<LearningElementPanelViewModel>(
    LearningElementPanelViewModel
  );

  return (
    <div className="le-panel-container fixed top-0 left-0 flex-col gap-4 m-5 w-120px max-h-full">
      {viewModels.length > 0 && (
        <div>
          {viewModels.map((viewModel, index) => (
            <LearningElementPanel
              key={index.toString()}
              viewModel={viewModel}
            />
          ))}
        </div>
      )}
    </div>
  );
}

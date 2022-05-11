import usePrimitive from "../CustomHooks/usePrimitive";
import LearningElementPanelPresenter from "./LearningElementPanelPresenter";
import LearningElementPanelViewModel from "./LearningElementPanelViewModel";

export default function LearningElementPanel(props: {
  viewModel: LearningElementPanelViewModel;
}) {
  const presenter = new LearningElementPanelPresenter(props.viewModel);
  const [text] = usePrimitive(props.viewModel.text);

  return (
    <button
      className="le-panel flex w-24 h-6 m-3 bg-white rounded hover:cursor-pointer"
      onClick={() => {
        presenter.clicked();
      }}
    >
      {text}
    </button>
  );
}

import usePrimitive from "../CustomHooks/usePrimitive";
import ILearningElementPanelPresenter from "./ILearningElementPanelPresenter";

export default function LearningElementPanel(props: {
  presenter: ILearningElementPanelPresenter;
}) {
  const presenter = props.presenter;
  const viewModel = presenter.getViewModel();

  const [text] = usePrimitive(viewModel.text);

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

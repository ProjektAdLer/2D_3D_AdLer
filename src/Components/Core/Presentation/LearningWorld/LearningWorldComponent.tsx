import useViewModelProvider from "../ViewModelProvider/useViewModelProvider";
import LearningWorldViewModel from "./LearningWorldViewModel";

export default function LearningWorldComponent() {
  const viewModel = useViewModelProvider<LearningWorldViewModel>(
    LearningWorldViewModel
  );

  return <div>{viewModel[0]?.id}</div>;
}

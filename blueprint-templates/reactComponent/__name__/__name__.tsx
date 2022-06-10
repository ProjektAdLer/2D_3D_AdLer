import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import {{name}}Controller from "./{{name}}Controller";
import {{name}}ViewModel from "./{{name}}ViewModel";

export default function {{name}}() {
  const [viewModels, controllers] = useViewModelControllerProvider<
  {{name}}ViewModel,
  {{name}}Controller
>({{name}}ViewModel);
  return (
    <div>{{name}}</div>
  );
}

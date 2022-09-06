import useBuilder from "../CustomHooks/useBuilder";
import {{name}}Controller from "./{{name}}Controller";
import {{name}}ViewModel from "./{{name}}ViewModel";

export default function {{name}}() {
  const [viewModel, controller] = useBuilder<
  {{name}}ViewModel,
  {{name}}Controller
>(BUILDER_TYPES.I{{name}}Builder);

  if (!viewModel || !controller) return null;

  return (
    <div>{{name}}</div>
  );
}

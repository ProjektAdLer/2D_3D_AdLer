import { injectable } from "inversify";
import INarrativeFrameworkPresenter from "./INarrativeFrameworkPresenter";
import NarrativeFrameworkViewModel from "./NarrativeFrameworkViewModel";

@injectable()
export default class NarrativeFrameworkPresenter
  implements INarrativeFrameworkPresenter
{
  constructor(private viewModel: NarrativeFrameworkViewModel) {}
}

import { injectable } from "inversify";
import WindowPresenter from "./WindowPresenter";
import WindowView from "./WindowView";
import WindowViewModel from "./WindowViewModel";
import IWindowPresenter from "./IWindowPresenter";
import AsyncPresentationBuilder from "../../PresentationBuilder/AsyncPresentationBuilder";
import { Vector3 } from "@babylonjs/core";
import { ThemeType } from "src/Components/Core/Domain/Types/ThemeTypes";

@injectable()
export default class WindowBuilder extends AsyncPresentationBuilder<
  WindowViewModel,
  undefined,
  WindowView,
  IWindowPresenter
> {
  position: Vector3;
  rotation: number;
  theme: ThemeType;

  constructor() {
    super(WindowViewModel, undefined, WindowView, WindowPresenter);
  }

  override buildViewModel(): void {
    if (
      this.position === undefined ||
      this.rotation === undefined ||
      this.theme === undefined
    )
      throw new Error("WindowBuilder: one or more properties are undefined.");

    super.buildViewModel();

    this.viewModel!.position = this.position;
    this.viewModel!.rotation = this.rotation;
    this.viewModel!.theme = this.theme;
  }

  override buildView(): void {
    super.buildView();

    this.view!.asyncSetup().then(
      () => {
        this.resolveIsCompleted();
      },
      (error) => {
        console.error(error);
      },
    );
  }
}

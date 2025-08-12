import { injectable } from "inversify";
import StandInDecorationViewModel from "./StandInDecorationViewModel";
import StandInDecorationView from "./StandInDecorationView";
import IStandInDecorationPresenter from "./IStandInDecorationPresenter";
import StandInDecorationPresenter from "./StandInDecorationPresenter";
import { Vector3 } from "@babylonjs/core";
import AsyncPresentationBuilder from "../../PresentationBuilder/AsyncPresentationBuilder";
import IStandInDecorationBuilder from "./IStandInDecorationBuilder";
import { ThemeType } from "src/Components/Core/Domain/Types/ThemeTypes";

@injectable()
export default class StandInDecorationBuilder
  extends AsyncPresentationBuilder<
    StandInDecorationViewModel,
    undefined,
    StandInDecorationView,
    IStandInDecorationPresenter
  >
  implements IStandInDecorationBuilder
{
  position: Vector3;
  rotation: number;
  spaceName: string;
  slotNumber: number;
  theme: ThemeType;

  constructor() {
    super(
      StandInDecorationViewModel,
      undefined,
      StandInDecorationView,
      StandInDecorationPresenter,
    );
  }

  buildViewModel(): void {
    if (
      this.position === undefined ||
      this.rotation === undefined ||
      this.spaceName === undefined ||
      this.slotNumber === undefined ||
      this.theme === undefined
    )
      throw new Error(
        `Position: ${this.position}, Rotation: ${this.rotation}, SpaceName: ${this.spaceName} or SlotNumber: ${this.slotNumber} is not defined. Set before using the builder.`,
      );
    super.buildViewModel();

    this.viewModel!.position = this.position;
    this.viewModel!.rotation = this.rotation;
    this.viewModel!.spaceName = this.spaceName;
    this.viewModel!.slotNumber = this.slotNumber;
    this.viewModel!.theme = this.theme;
  }

  buildView(): void {
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

import { Mesh } from "@babylonjs/core";
import { ThemeType } from "src/Components/Core/Domain/Types/ThemeTypes";
import Observable from "src/Lib/Observable";

export default class AmbienceViewModel {
  theme: ThemeType;
  public meshes: Observable<Mesh[]> = new Observable<Mesh[]>([]);
}

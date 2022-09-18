import { ElementID } from "../../../Domain/Types/EntityTypes";
import { Mesh, Vector3 } from "@babylonjs/core";
import Observable from "../../../../../Lib/Observable";
import AbstractElement from "../../../Domain/Entities/ElementData/AbstractElementData";

export default class ElementViewModel {
  public id: ElementID;
  public meshes: Observable<Mesh[]> = new Observable<Mesh[]>();
  public position: Observable<Vector3> = new Observable<Vector3>();
  public rotation: Observable<number> = new Observable<number>();
  public name: Observable<string> = new Observable<string>();
  public elementData = new Observable<AbstractElement>();
}

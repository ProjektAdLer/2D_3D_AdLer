import { IDTO } from "./../Abstract/IDTO";
import { injectable } from "inversify";
import { SynchronousUsecase } from "../Abstract/SynchronousUsecase";
import { ILoadWorld } from "./ILoadWorld";

@injectable()
export class LoadWorld extends SynchronousUsecase implements ILoadWorld {
  public async execute(): Promise<void> {
    console.log("Hier soll die Welt geladen werden");
    //super.notify({ worldName: "Habeledabele" } as IDTO);
  }
}

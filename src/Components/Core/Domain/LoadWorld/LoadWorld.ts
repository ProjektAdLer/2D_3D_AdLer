import { IDTO } from "./../Abstract/IDTO";
import { injectable } from "inversify";
import { SyncronousUsecase } from "../Abstract/SyncronousUsecase";
import { ILoadWorld } from "./ILoadWorld";

@injectable()
export class LoadWorld extends SyncronousUsecase implements ILoadWorld {
  public async execute(): Promise<void> {
    console.log("Hier soll die Welt geladen werden");
    super.notify({ worldName: "Habeledabele" } as IDTO);
  }
}

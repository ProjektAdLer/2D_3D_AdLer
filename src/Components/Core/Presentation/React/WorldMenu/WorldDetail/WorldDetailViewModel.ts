import { ElementID } from "src/Components/Core/Domain/Types/EntityTypes";
import Observable from "src/Lib/Observable";

export interface WorldDetailWorldData {
  id: ElementID;
  name: string;
  isCompleted: boolean;
}

export default class WorldDetailViewModel {
  id: Observable<ElementID> = new Observable<ElementID>(undefined);
  name: Observable<string> = new Observable<string>("Default Name");
  description: Observable<string> = new Observable<string>(
    "Default Description \n Default Description Part 2"
  );
  goals: Observable<string> = new Observable<string>("");
  spaceCount: Observable<number> = new Observable<number>(0);

  //Likely needs spaces as well (name, description, isCompleted, id)
}

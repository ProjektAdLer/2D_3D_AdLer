import { ComponentID } from "../../Domain/Types/EntityTypes";

export default class NarrativeFrameworkTO {
  id: ComponentID;

  text: string;
  image?: string;
  video?: string;
}

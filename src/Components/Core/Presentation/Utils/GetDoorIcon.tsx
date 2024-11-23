import entryIcon from "../../../../Assets/icons/door-in.svg";
import exitIcon from "../../../../Assets/icons/door-out.svg";
import { DoorTypeStrings } from "../../Domain/Types/DoorTypes";

export const getDoorIcon = (type: DoorTypeStrings) => {
  switch (type) {
    case "entryDoor":
      return (
        <img src={entryIcon} alt="text-icon" className="h-8 mr-2 lg:h-12"></img>
      );
    case "exitDoor":
      return (
        <img src={exitIcon} alt="text-icon" className="h-8 mr-2 lg:h-12"></img>
      );
  }
};

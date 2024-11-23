export enum DoorTypes {
  entryDoor = "entryDoor",
  exitDoor = "exitDoor",
}

export type DoorTypeStrings = keyof typeof DoorTypes;

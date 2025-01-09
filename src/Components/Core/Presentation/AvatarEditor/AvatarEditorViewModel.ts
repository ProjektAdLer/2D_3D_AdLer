import Observable from "src/Lib/Observable";

export interface AvatarConfigHairIconVisibility {
  hairstyles: Observable<boolean>;
  beards: Observable<boolean>;
}

export interface AvatarConfigFaceIconVisibility {
  eyebrows: Observable<boolean>;
  eyes: Observable<boolean>;
  noses: Observable<boolean>;
  mouths: Observable<boolean>;
}

export interface AvatarConfigAccessoireIconVisibility {
  headGear: Observable<boolean>;
  glasses: Observable<boolean>;
  backpack: Observable<boolean>;
  other: Observable<boolean>;
}

export interface AvatarConfigClothingIconVisibility {
  shirts: Observable<boolean>;
  pants: Observable<boolean>;
  shoes: Observable<boolean>;
}

export default class AvatarEditorViewModel {
  hairMenuVisibility: AvatarConfigHairIconVisibility = {
    hairstyles: new Observable<boolean>(false),
    beards: new Observable<boolean>(false),
  };

  faceMenuVisibility: AvatarConfigFaceIconVisibility = {
    eyebrows: new Observable<boolean>(false),
    eyes: new Observable<boolean>(false),
    noses: new Observable<boolean>(false),
    mouths: new Observable<boolean>(false),
  } as AvatarConfigFaceIconVisibility;

  accessoireMenuVisibility: AvatarConfigAccessoireIconVisibility = {
    headGear: new Observable<boolean>(false),
    glasses: new Observable<boolean>(false),
    backpack: new Observable<boolean>(false),
    other: new Observable<boolean>(false),
  };

  clothingMenuVisibility: AvatarConfigClothingIconVisibility = {
    shirts: new Observable<boolean>(false),
    pants: new Observable<boolean>(false),
    shoes: new Observable<boolean>(false),
  };
}

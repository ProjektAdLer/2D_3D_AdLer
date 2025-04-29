import { QuizElementModelTypes } from "./../../Domain/LearningElementModels/LearningElementModelTypes";
import { LearningElementModel } from "../../Domain/LearningElementModels/LearningElementModelTypes";
import { EmotionType } from "../../Domain/Types/EmotionTypes";

// EmotionMap is used as index of ImageMaps value-Element
enum EmotionMap {
  welcome = 1, // neutral emotion
  happy,
  disappointed,
  thumbsup,
  angry,
  tired,
  shocked,
}

// first default is substitute for not having a full-body image
const keys = [
  "welcome",
  "welcome",
  "happy",
  "disappointed",
  "thumbsup",
  "angry",
  "tired",
  "shocked",
];

const ImageDB = {
  // defaults
  defaultSuburbNPC: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-dozentjoerg/a-npc-dozentjoerg-${value}.png`,
    );
  }),
  defaultArcadeNPC: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-sheriffjustice/a-npc-sheriffjustice-${value}.png`,
    );
  }),
  defaultCampusNPC: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-dozentgeorg/a-npc-dozentgeorg-${value}.png`,
    );
  }),
  // non defaults
  aleRobot: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-alerobot/a-npc-alerobot-${value}.png`,
    );
  }),
  bullyFemale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-bully-female/a-npc-bully-female-${value}.png`,
    );
  }),
  bullyMale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-bully-male/a-npc-bully-male-${value}.png`,
    );
  }),
  defaultDarkFemale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-defaultdark-female/a-npc-defaultdark-female-${value}.png`,
    );
  }),
  defaultDarkMale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-defaultdark-male/a-npc-defaultdark-male-${value}.png`,
    );
  }),
  dozentAntonia: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-dozentantonia/a-npc-dozentantonia-${value}.png`,
    );
  }),
  dozentDaniel: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-dozentdaniel/a-npc-dozentdaniel-${value}.png`,
    );
  }),
  dozentGeorg: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-dozentgeorg/a-npc-dozentgeorg-${value}.png`,
    );
  }),
  dozentJoerg: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-dozentjoerg/a-npc-dozentjoerg-${value}.png`,
    );
  }),
  dozentLukas: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-dozentlukas/a-npc-dozentlukas-${value}.png`,
    );
  }),
  hiphopFemale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-hiphop-female/a-npc-hiphop-female-${value}.png`,
    );
  }),
  hiphopMale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-hiphop-male/a-npc-hiphop-male-${value}.png`,
    );
  }),
  nerdDarkFemale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-nerddark-female/a-npc-nerddark-female-${value}.png`,
    );
  }),
  nerdDarkMale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-nerddark-male/a-npc-nerddark-male-${value}.png`,
    );
  }),
  nerdLightFemale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-nerdlight-female/a-npc-nerdlight-female-${value}.png`,
    );
  }),
  nerdLightMale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-nerdlight-male/a-npc-nerdlight-male-${value}.png`,
    );
  }),
  oldieDarkFemale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-oldiedark-female/a-npc-oldiedark-female-${value}.png`,
    );
  }),
  oldieDarkMale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-oldiedark-male/a-npc-oldiedark-male-${value}.png`,
    );
  }),
  oldieLightFemale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-oldielight-female/a-npc-oldielight-female-${value}.png`,
    );
  }),
  oldieLightMale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-oldielight-male/a-npc-oldielight-male-${value}.png`,
    );
  }),
  santaFemale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-santa-female/a-npc-santa-female-${value}.png`,
    );
  }),
  santaMale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-santa-male/a-npc-santa-male-${value}.png`,
    );
  }),
  sheriffJustice: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-sheriffjustice/a-npc-sheriffjustice-${value}.png`,
    );
  }),
  studentDarkFemale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-studentdark-female/a-npc-studentdark-female-${value}.png`,
    );
  }),
  studentDarkMale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-studentdark-male/a-npc-studentdark-male-${value}.png`,
    );
  }),
  studentLightFemale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-studentlight-female/a-npc-studentlight-female-${value}.png`,
    );
  }),
  studentLightMale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-studentlight-male/a-npc-studentlight-male-${value}.png`,
    );
  }),
};

interface ImageMap {
  get(key: LearningElementModel): string[] | undefined;
}

const imageMap: ImageMap = new Map([
  [QuizElementModelTypes.DefaultSuburbNPC, ImageDB.defaultSuburbNPC],
  [QuizElementModelTypes.DefaultArcadeNPC, ImageDB.defaultArcadeNPC],
  [QuizElementModelTypes.DefaultCampusNPC, ImageDB.defaultCampusNPC],
  [QuizElementModelTypes.AleRobotNPC, ImageDB.aleRobot],
  [QuizElementModelTypes.BullyFemaleNPC, ImageDB.bullyFemale],
  [QuizElementModelTypes.BullyMaleNPC, ImageDB.bullyMale],
  [QuizElementModelTypes.DefaultDarkFemaleNPC, ImageDB.defaultDarkFemale],
  [QuizElementModelTypes.DefaultDarkMaleNPC, ImageDB.defaultDarkMale],
  // [QuizElementModelTypes.DefaultLightMaleNPC, ImageDB.defaultLightMale],
  [QuizElementModelTypes.DozentAntoniaNPC, ImageDB.dozentAntonia],
  [QuizElementModelTypes.DozentDanielNPC, ImageDB.dozentDaniel],
  [QuizElementModelTypes.DozentGeorgNPC, ImageDB.dozentGeorg],
  [QuizElementModelTypes.DozentJoergNPC, ImageDB.dozentJoerg],
  [QuizElementModelTypes.DozentLukasNPC, ImageDB.dozentLukas],
  [QuizElementModelTypes.HiphopFemaleNPC, ImageDB.hiphopFemale],
  [QuizElementModelTypes.HiphopMaleNPC, ImageDB.hiphopMale],
  [QuizElementModelTypes.NerdDarkFemaleNPC, ImageDB.nerdDarkFemale],
  [QuizElementModelTypes.NerdDarkMaleNPC, ImageDB.nerdDarkMale],
  [QuizElementModelTypes.NerdLightFemaleNPC, ImageDB.nerdLightFemale],
  [QuizElementModelTypes.NerdLightMaleNPC, ImageDB.nerdLightMale],
  [QuizElementModelTypes.OldieDarkFemaleNPC, ImageDB.oldieDarkFemale],
  [QuizElementModelTypes.OldieDarkMaleNPC, ImageDB.oldieDarkMale],
  [QuizElementModelTypes.OldieLightFemaleNPC, ImageDB.oldieLightFemale],
  [QuizElementModelTypes.OldieLightMaleNPC, ImageDB.oldieLightMale],
  [QuizElementModelTypes.SantaFemaleNPC, ImageDB.santaFemale],
  [QuizElementModelTypes.SantaMaleNPC, ImageDB.santaMale],
  [QuizElementModelTypes.SheriffJusticeNPC, ImageDB.sheriffJustice],
  [QuizElementModelTypes.StudentDarkFemaleNPC, ImageDB.studentDarkFemale],
  [QuizElementModelTypes.StudentDarkMaleNPC, ImageDB.studentDarkMale],
  [QuizElementModelTypes.StudentLightFemaleNPC, ImageDB.studentLightFemale],
  [QuizElementModelTypes.StudentLightMaleNPC, ImageDB.studentLightMale],
]);

export function getNPCImage(
  model: LearningElementModel,
  close: boolean,
  emotion: EmotionType | null,
) {
  if (emotion === null) {
    emotion = EmotionType.welcome;
  }

  const index = Number(close) * EmotionMap[emotion];

  const result = imageMap.get(model)?.[index];

  if (!result) {
    return ImageDB.aleRobot[0];
  }
  return result;
}

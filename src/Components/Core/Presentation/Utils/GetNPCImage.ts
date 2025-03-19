import { QuizElementModelTypes } from "./../../Domain/LearningElementModels/LearningElementModelTypes";
import { LearningElementModel } from "../../Domain/LearningElementModels/LearningElementModelTypes";
import { EmotionType } from "../../Domain/Types/EmotionTypes";

import campusNPC from "../../../../Assets/misc/quizBackgrounds/a-npc-dozentlukas.png";
import campusNPC_Close from "../../../../Assets/misc/quizBackgrounds/a-quizbg-dozentlukas-close.png";
import campusNPC_Happy from "../../../../Assets/misc/quizBackgrounds/a-npc-dozentlukas/a-npc-dozentlukas-happy.png";
import campusNPC_Sad from "../../../../Assets/misc/quizBackgrounds/a-npc-dozentlukas/a-npc-dozentlukas-disappointed.png";

import arcadeNPC from "../../../../Assets/misc/quizBackgrounds/a-npc-sheriffjustice.png";
import arcadeNPC_Close from "../../../../Assets/misc/quizBackgrounds/a-npc-sheriffjustice-close.png";
import arcadeNPC_Happy from "../../../../Assets/misc/quizBackgrounds/a-npc-sheriffjustice/a-npc-sheriffjustice-happy.png";
import arcadeNPC_Sad from "../../../../Assets/misc/quizBackgrounds/a-npc-sheriffjustice/a-npc-sheriffjustice-disappointed.png";

import defaultNPC from "../../../../Assets/misc/quizBackgrounds/a-quizbg-defaultnpc.png";
import defaultNPC_Close from "../../../../Assets/misc/quizBackgrounds/a-quizbg-defaultnpc-close.png";
import defaultNPC_Happy from "../../../../Assets/misc/quizBackgrounds/a-npc-defaultfemale/a-npc-defaultfemale-happy.png";
import defaultNPC_Sad from "../../../../Assets/misc/quizBackgrounds/a-npc-defaultfemale/a-npc-defaultfemale-disappointed.png";

import robotNPC from "../../../../Assets/misc/quizBackgrounds/a-quizbg-alerobot.png";
import robotNPC_Close from "../../../../Assets/misc/quizBackgrounds/a-quizbg-alerobot-close.png";
import robotNPC_Happy from "../../../../Assets/misc/quizBackgrounds/a-npc-alerobot/a-npc-alerobot-happy.png";
import robotNPC_Sad from "../../../../Assets/misc/quizBackgrounds/a-npc-alerobot/a-npc-alerobot-disappointed.png";
import robotNPC_Approval from "../../../../Assets/misc/quizBackgrounds/a-npc-alerobot/a-npc-alerobot-thumbsup.png";

// EmotionMap is used as index of ImageMaps value-Element
enum EmotionMap {
  default = 1, // neutral emotion
  happy,
  sad,
  approval,
}

// first preview is substitute for not having a full-body image
const keys = ["preview", "preview", "happy", "disappointed"];

const ImageDB = {
  // nerdFemaleDark: ["happy"].map((value) => {
  //   return require(
  //     `../../../../Assets/misc/quizBackgrounds/a-npc-averagenerdfemaledark/a-npc-averagenerdfemaledark-${value}.png`,
  //   );
  // }),
  nerdFemaleLight: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-averagenerdfemalelight/a-npc-averagenerdfemalelight-${value}.png`,
    );
  }),
  nerdMaleDark: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-averagenerdmaledark/a-npc-averagenerdmaledark-${value}.png`,
    );
  }),
  nerdMaleLight: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-averagenerdmalelight/a-npc-averagenerdmalelight-${value}.png`,
    );
  }),
  bullyFemale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-bullyfemale/a-npc-bullyfemale-${value}.png`,
    );
  }),
  bullyMale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-bullymale/a-npc-bullymale-${value}.png`,
    );
  }),
  defaultMale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-defaultmale/a-npc-defaultmale-${value}.png`,
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
  hiphopFemale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-hiphopfemale/a-npc-hiphopfemale-${value}.png`,
    );
  }),
  hiphopMale: keys.map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-hiphopmale/a-npc-hiphopmale-${value}.png`,
    );
  }),
  santaFemale: ["welcome", "welcome", "happy", "disappointed"].map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-santafemale/a-npc-santafemale-${value}.png`,
    );
  }),
  santaMale: ["welcome", "welcome", "happy", "disappointed"].map((value) => {
    return require(
      `../../../../Assets/misc/quizBackgrounds/a-npc-santamale/a-npc-santamale-${value}.png`,
    );
  }),
};

console.log("ImageDB: ", ImageDB);

interface ImageMap {
  get(key: LearningElementModel): string[] | undefined;
}

const imageMap: ImageMap = new Map([
  [
    QuizElementModelTypes.RobotNPC,
    [robotNPC, robotNPC_Close, robotNPC_Happy, robotNPC_Sad, robotNPC_Approval],
  ],
  [
    QuizElementModelTypes.DefaultNPC,
    [defaultNPC, defaultNPC_Close, defaultNPC_Happy, defaultNPC_Sad],
  ],
  [
    QuizElementModelTypes.ArcadeNPC,
    [arcadeNPC, arcadeNPC_Close, arcadeNPC_Happy, arcadeNPC_Sad],
  ],
  [
    QuizElementModelTypes.CampusNPC,
    [campusNPC, campusNPC_Close, campusNPC_Happy, campusNPC_Sad],
  ],
  //[QuizElementModelTypes.NerdFemaleDarkNPC, ImageDB.nerdFemaleDark],
  [QuizElementModelTypes.NerdFemaleLightNPC, ImageDB.nerdFemaleLight],
  [QuizElementModelTypes.NerdMaleDarkNPC, ImageDB.nerdMaleDark],
  [QuizElementModelTypes.NerdMaleLightNPC, ImageDB.nerdMaleLight],
  [QuizElementModelTypes.BullyFemaleNPC, ImageDB.bullyFemale],
  [QuizElementModelTypes.BullyMaleNPC, ImageDB.bullyMale],
  [QuizElementModelTypes.DefaultMaleNPC, ImageDB.defaultMale],
  [QuizElementModelTypes.DozentAntoniaNPC, ImageDB.dozentAntonia],
  [QuizElementModelTypes.DozentDanielNPC, ImageDB.dozentDaniel],
  [QuizElementModelTypes.DozentGeorgNPC, ImageDB.dozentGeorg],
  [QuizElementModelTypes.DozentJoergNPC, ImageDB.dozentJoerg],
  [QuizElementModelTypes.HiphopFemaleNPC, ImageDB.hiphopFemale],
  [QuizElementModelTypes.HiphopMaleNPC, ImageDB.hiphopMale],
  [QuizElementModelTypes.SantaFemaleNPC, ImageDB.santaFemale],
  [QuizElementModelTypes.SantaMaleNPC, ImageDB.santaMale],
]);

export function getNPCImage(
  model: LearningElementModel,
  close: boolean,
  emotion: EmotionType | null,
) {
  if (emotion === null) {
    emotion = EmotionType.default;
  }

  const index = Number(close) * EmotionMap[emotion];

  const result = imageMap.get(model)?.[index];
  console.log("NPC Image: ", model, close, emotion, result);

  if (!result) {
    return defaultNPC;
  }
  return result;
}

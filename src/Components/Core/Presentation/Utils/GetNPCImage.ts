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
]);

// EmotionMap is used as index of ImageMaps value-Element
enum EmotionMap {
  default = 1, // neutral emotion
  happy,
  sad,
  approval,
}

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

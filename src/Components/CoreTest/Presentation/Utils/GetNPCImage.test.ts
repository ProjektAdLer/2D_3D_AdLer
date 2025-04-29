import { QuizElementModelTypes } from "../../../Core/Domain/LearningElementModels/LearningElementModelTypes.ts";
import { EmotionType } from "../../../Core/Domain/Types/EmotionTypes.ts";
import { getNPCImage } from "../../../Core/Presentation/Utils/GetNPCImage.ts";
import welcomeRobotNPC from "../../../../Assets/misc/quizBackgrounds/a-npc-alerobot/a-npc-alerobot-welcome.png";
import happyRobotNPC from "../../../../Assets/misc/quizBackgrounds/a-npc-alerobot/a-npc-alerobot-happy.png";
import disappointedRobotNPC from "../../../../Assets/misc/quizBackgrounds/a-npc-alerobot/a-npc-alerobot-disappointed.png";
import thumbsUpRobotNPC from "../../../../Assets/misc/quizBackgrounds/a-npc-alerobot/a-npc-alerobot-thumbsUp.png";
import angryRobotNPC from "../../../../Assets/misc/quizBackgrounds/a-npc-alerobot/a-npc-alerobot-angry.png";
import tiredRobotNPC from "../../../../Assets/misc/quizBackgrounds/a-npc-alerobot/a-npc-alerobot-tired.png";
import shockedRobotNPC from "../../../../Assets/misc/quizBackgrounds/a-npc-alerobot/a-npc-alerobot-shocked.png";

describe("GetNPCImage should return a string to a corresponding image", () => {
  test.each([
    [QuizElementModelTypes.AleRobotNPC, false, null, welcomeRobotNPC],
    [QuizElementModelTypes.AleRobotNPC, true, EmotionType.happy, happyRobotNPC],
    [
      QuizElementModelTypes.AleRobotNPC,
      true,
      EmotionType.disappointed,
      disappointedRobotNPC,
    ],
    [
      QuizElementModelTypes.AleRobotNPC,
      true,
      EmotionType.thumbsup,
      thumbsUpRobotNPC,
    ],
    [QuizElementModelTypes.AleRobotNPC, true, EmotionType.angry, angryRobotNPC],
    [QuizElementModelTypes.AleRobotNPC, true, EmotionType.tired, tiredRobotNPC],
    [
      QuizElementModelTypes.AleRobotNPC,
      true,
      EmotionType.shocked,
      shockedRobotNPC,
    ],
  ])(
    "should return image %s which is close %s with emotion %s",
    (model, close, emotion, image) => {
      const result = getNPCImage(model, close, emotion);
      expect(result).toEqual(image);
    },
  );
});

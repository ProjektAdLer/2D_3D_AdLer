import { QuizElementModelTypes } from "../../../Core/Domain/LearningElementModels/LearningElementModelTypes.ts";
import { EmotionType } from "../../../Core/Domain/Types/EmotionTypes.ts";
import { getNPCImage } from "../../../Core/Presentation/Utils/GetNPCImage.ts";
import robotNPC from "../../../../Assets/misc/quizBackgrounds/a-quizbg-alerobot.png";
import robotNPC_Close from "../../../../Assets/misc/quizBackgrounds/a-quizbg-alerobot-close.png";
import arcadeNPC_Sad from "../../../../Assets/misc/quizBackgrounds/a-npc-sheriffjustice/a-npc-sheriffjustice-disappointed.png";
import defaultNPC from "../../../../Assets/misc/quizBackgrounds/a-quizbg-defaultnpc.png";

describe("GetNPCImage should return a string to a corresponding image", () => {
  test.each([
    [QuizElementModelTypes.RobotNPC, true, null, robotNPC_Close],
    [QuizElementModelTypes.RobotNPC, false, null, robotNPC],
    [QuizElementModelTypes.RobotNPC, true, EmotionType.default, robotNPC_Close],
    [QuizElementModelTypes.RobotNPC, false, EmotionType.happy, robotNPC],
    [QuizElementModelTypes.ArcadeNPC, true, EmotionType.sad, arcadeNPC_Sad],
    [QuizElementModelTypes.ArcadeNPC, true, EmotionType.approval, defaultNPC],
  ])(
    "should return image %s which is close %s with emotion %s",
    (model, close, emotion, image) => {
      const result = getNPCImage(model, close, emotion);
      expect(result).toEqual(image);
    },
  );
});

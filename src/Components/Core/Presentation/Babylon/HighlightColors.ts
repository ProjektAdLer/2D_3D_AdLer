import { Color3 } from "@babylonjs/core";

// possible ways to write color:
// Color3.FromHexString("#FFFF00") -> HEX-Code standard way to use
// Color3.FromInts(0, 255, 0) -> RGB-Code 0-256
// new Color3(0, 0, 1) -> RGB-Code 0-100

const HighlightColors = {
  LearningElementUnsolved: Color3.FromHexString("#FF9900"),
  LearningElementSolved: Color3.FromHexString("#00FF00"),
  NonLearningElementBase: Color3.FromHexString("#9232E6"),
  LearningElementHighlighted: Color3.FromHexString("#FF00FF"),
  StoryElementHighlighted: Color3.FromHexString("#0088FF"),
  getNonInteractableColor: (baseColor: Color3) => {
    return baseColor.add(new Color3(0.45, 0.45, 0.45));
  },
};

export default HighlightColors;

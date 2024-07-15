import { Color3 } from "@babylonjs/core";

const HighlightColors = {
  LearningElementUnsolved: Color3.FromHexString("#FF0000"),
  LearningElementSolved: new Color3(0, 1, 0),
  NonLearningElementBase: new Color3(0, 0, 1),
  LearningElementHighlighted: new Color3(1, 0, 1),
  getNonInteractableColor: (baseColor: Color3) => {
    return baseColor.add(new Color3(0.45, 0.45, 0.45));
  },
};

export default HighlightColors;

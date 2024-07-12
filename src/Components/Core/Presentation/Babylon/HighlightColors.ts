import { Color3 } from "@babylonjs/core";

const HighlightColors = {
  LearningElementUnsolved: Color3.Red(),
  LearningElementSolved: Color3.Green(),
  NonLearningElementBase: Color3.Blue(),
  LearningElementHighlighted: Color3.Purple(),
  getNonInteractableColor: (baseColor: Color3) => {
    return baseColor.add(new Color3(0.5, 0.5, 0.5));
  },
};

export default HighlightColors;

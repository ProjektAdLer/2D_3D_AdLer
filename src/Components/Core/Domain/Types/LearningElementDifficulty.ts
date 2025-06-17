export enum LearningElementDifficulty {
  easy = 0,
  medium = 100,
  hard = 200,
}

export type DifficultyInfo = {
  difficultyType: LearningElementDifficulty;
  multiplicator: number;
  // xpReward: number;
};

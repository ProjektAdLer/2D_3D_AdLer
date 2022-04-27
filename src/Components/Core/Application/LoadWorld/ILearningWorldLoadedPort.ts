export class LearningWorldTO {
  id: string;
}

export default interface ILearningWorldLoadedPort {
  presentLearningWorld(learningWorldTO: LearningWorldTO): void;
}

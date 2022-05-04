export class LearningElementTO {
  type: string;
  roomId: string;
}

export default interface ILearningRoomPort {
  addLearningElement(learningElementTO: LearningElementTO): void;
}

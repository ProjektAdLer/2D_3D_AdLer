export class APILearningElementTO {
  id: number;
  elementType: string;
  value: {
    type: string;
    value: number;
  }[];
  requirements: {
    type: string;
    value: number;
  }[];
}

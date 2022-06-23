export class APILearningElementTO {
  id: number;
  name: string;
  elementType: string;
  value: {
    type: string;
    value: number;
  }[];
  requirements: {
    type: string;
    value: number;
  }[];
  metaData: { key: string; value: string }[];
}

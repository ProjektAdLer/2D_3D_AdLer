import DSL from "../../../Core/Adapters/Backend/IDSL";

export const correctFakeLearningElementsMinimalResponse = [
  {
    id: 1,
    name: "Test",
    elementType: "h5p",
    value: [
      {
        type: "points",
        value: 10,
      },
    ],
    requirements: [
      {
        type: "points",
        value: 10,
      },
    ],
    metaData: [
      {
        key: "h5pContextId",
        value: "123",
      },
      {
        key: "h5pFileName",
        value: "fileName",
      },
    ],
  },
];

export const correctFakeLearningElementResponse = [
  {
    id: 1,
    name: "Metriken Einstiegsvideo",
    elementType: "h5p",
    value: [
      {
        type: "points",
        value: 10,
      },
    ],
    requirements: [],
    metaData: [
      {
        key: "h5pContextId",
        value: "123",
      },
      {
        key: "h5pFileName",
        value: "Metriken Teil 1",
      },
    ],
  },
  {
    id: 2,
    name: "Metriken Schiebespiel",
    elementType: "video",
    value: [
      {
        type: "points",
        value: 10,
      },
    ],
    requirements: [],
    metaData: [
      {
        key: "h5pContextId",
        value: "123",
      },
      {
        key: "h5pFileName",
        value: "Schiebespiel Metriken",
      },
    ],
  },
  {
    id: 3,
    name: "Metriken Wortsuche",
    elementType: "image",
    value: [
      {
        type: "points",
        value: 10,
      },
    ],
    requirements: [],
    metaData: [
      {
        key: "h5pContextId",
        value: "123",
      },
      {
        key: "h5pFileName",
        value: "Wortsuche Metriken",
      },
    ],
  },
  {
    id: 4,
    name: "Metriken Einstiegsvideo",
    elementType: "text",
    value: [
      {
        type: "points",
        value: 10,
      },
    ],
    requirements: [],
    metaData: [
      {
        key: "h5pContextId",
        value: "123",
      },
      {
        key: "h5pFileName",
        value: "Metriken Teil 1",
      },
    ],
  },
];

export const correctFakeRoomResponse = [
  { id: 1, name: "Lernraum Metriken", learningElementIds: [1, 2, 3, 4] },
];

export const correctFakeRoomResponseMinimal = [
  { id: 1, name: "Lernraum Metriken", learningElementIds: [1] },
];

export const correctFakeWorldResponse = {
  name: "Lernwelt Metriken",
  learningRoomIds: [1],
  goal: "Testgoal",
};

export const mockDSL: DSL = {
  learningWorld: {
    identifier: {
      type: "name",
      value: "Lernwelt Metriken",
    },
    learningWorldContent: [],
    topics: [],
    goal: "Testgoal",
    learningSpaces: [
      {
        spaceId: 1,
        learningSpaceName: "Lernraum Metriken",
        identifier: {
          type: "name",
          value: "Lernraum Metriken",
        },
        learningSpaceContent: [1, 2, 3],
        requirements: null,
      },
    ],
    learningElements: [
      {
        id: 1,
        identifier: {
          type: "FileName",
          value: "Metriken Einstiegsvideo",
        },
        elementType: "h5p",
        learningElementValue: null,
        requirements: null,
        metaData: [
          { key: "h5pContextId", value: "123" },
          { key: "h5pFileName", value: "Metriken Teil 1" },
        ],
      },
      {
        id: 2,
        identifier: {
          type: "FileName",
          value: "Metriken Schiebespiel",
        },
        elementType: "h5p",
        learningElementValue: null,
        requirements: null,
        metaData: [
          { key: "h5pContextId", value: "123" },
          { key: "h5pFileName", value: "Schiebespiel Metriken" },
        ],
      },
      {
        id: 3,
        identifier: {
          type: "FileName",
          value: "Metriken Wortsuche",
        },
        elementType: "h5p",
        learningElementValue: null,
        requirements: null,
        metaData: [
          { key: "h5pContextId", value: "123" },
          { key: "h5pFileName", value: "Wortsuche Metriken" },
        ],
      },
      {
        id: 4,
        identifier: {
          type: "FileName",
          value: "DSL Dokument",
        },
        elementType: "json",
        learningElementValue: null,
        requirements: null,
        metaData: [
          { key: "h5pContextId", value: "123" },
          { key: "h5pFileName", value: "bla.h5p" },
        ],
      },
    ],
  },
};

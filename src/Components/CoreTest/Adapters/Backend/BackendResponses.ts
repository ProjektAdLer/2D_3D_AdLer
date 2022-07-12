import DSL from "../../../Core/Adapters/Backend/IDSL";

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
        value: "Schiebespiel Metriken",
      },
    ],
  },
  {
    id: 3,
    name: "Metriken Wortsuche",
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
        value: "Wortsuche Metriken",
      },
    ],
  },
];

export const correctFakeRoomResponse = [
  { id: 1, name: "Lernraum Metriken", learningElementIds: [1, 2, 3] },
];

export const correctFakeWorldResponse = {
  name: "Lernwelt Metriken",
  learningRoomIds: [1],
};

export const mockDSL: DSL = {
  learningWorld: {
    identifier: {
      type: "name",
      value: "Lernwelt Metriken",
    },
    learningWorldContent: [],
    topics: [],
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

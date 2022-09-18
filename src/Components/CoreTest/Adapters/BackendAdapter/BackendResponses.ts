import ElementTO from "src/Components/Core/Application/DataTransportObjects/ElementTO";
import SpaceTO from "src/Components/Core/Application/DataTransportObjects/SpaceTO";
import WorldTO from "src/Components/Core/Application/DataTransportObjects/WorldTO";
import IDSL from "../../../Core/Adapters/BackendAdapter/Types/IDSL";

export const minimalGetLearningWorldDataResponse: WorldTO = {
  worldName: "TestWorld",
  worldGoal: "TestGoal",
  spaces: [
    {
      id: 1,
      name: "TestRoom",
      elements: [
        {
          id: 1,
          name: "TestElement",
          value: 42,
          requirements: undefined,
          elementData: {
            type: "text",
          },
        },
      ],
    },
  ],
};

// expected structure of the TOs
// this needs to be updated if the TOs changes
export const expectedLearningWorldTO: WorldTO = {
  worldName: expect.any(String),
  worldGoal: expect.any(String),
  spaces: expect.any(Array),
};

export const expectedLearningRoomTO: SpaceTO = {
  id: expect.any(Number),
  name: expect.any(String),
  elements: expect.any(Array),
};

export const expectedLearningElementTO: ElementTO = {
  id: expect.any(Number),
  name: expect.any(String),
  value: expect.any(Number),
  requirements: expect.any(Array),
  elementData: expect.any(Object),
};

export const mockDSL: IDSL = {
  world: {
    idNumber: "1a28a418-00f5-4b24-8ac0-5b4e03ed3f73",
    identifier: {
      type: "name",
      value: "Lernwelt Metriken - 4 H5P",
    },
    description:
      "Diese Lernwelt soll den Lernenden, Metriken verständlich erklären.",
    goals:
      "Lernende können nach Abschluss der Lernwelt Metriken identifizieren und anwenden.",
    worldContent: [],
    topics: [],
    spaces: [
      {
        spaceId: 0,
        identifier: {
          type: "name",
          value: "Freie Lernelemente",
        },
        description: "Diese Lernelemente sind keinem Lernraum zugeordnet",
        goals: "",
        spaceContent: [1, 2, 3, 4, 5],
        requirements: null,
      },
    ],
    elements: [
      {
        id: 1,
        identifier: {
          type: "FileName",
          value: "DSL_Document",
        },
        description: "",
        goals: "",
        elementType: "json",
        elementValueList: [
          {
            type: "Points",
            value: "0",
          },
        ],
        spaceParentId: 0,
        requirements: null,
        metaData: null,
      },
      {
        id: 2,
        identifier: {
          type: "FileName",
          value: "Einführungsvideo",
        },
        description:
          "In diesem Video werden Metriken grundlegend erklärt und auf ihre Funktion eingegangen",
        goals:
          "Lernende verstehen was Metriken sind und wofür sie genutzt werden. ",
        elementType: "h5p",
        elementValueList: [
          {
            type: "Points",
            value: "15",
          },
        ],
        spaceParentId: 0,
        requirements: null,
        metaData: [
          {
            key: "h5pFileName",
            value:
              "wwwroot/courses/2/Lernwelt Metriken - 4 H5P/h5p/Einführungsvideo",
          },
          {
            key: "h5pContextId",
            value: "1337",
          },
        ],
      },
      {
        id: 3,
        identifier: {
          type: "FileName",
          value: "Folge-Video",
        },
        description: "In diesem Video werden weitere Metriken erklärt.",
        goals: "Lernende haben ein vertieftes Verständnis über Metriken",
        elementType: "h5p",
        elementValueList: [
          {
            type: "Points",
            value: "25",
          },
        ],
        spaceParentId: 0,
        requirements: null,
        metaData: [
          {
            key: "h5pFileName",
            value:
              "wwwroot/courses/2/Lernwelt Metriken - 4 H5P/h5p/Folge-Video",
          },
          {
            key: "h5pContextId",
            value: "1337",
          },
        ],
      },
      {
        id: 4,
        identifier: {
          type: "FileName",
          value: "Suche die Wörter - Metriken",
        },
        description:
          "Es ist eine große Wort Tafel gegeben. Auf dieser müssen verschiedene Begriffe gesucht und gefunden werden.",
        goals: "Finde alle Wörter um 100% zu erreichen.",
        elementType: "h5p",
        elementValueList: [
          {
            type: "Points",
            value: "25",
          },
        ],
        spaceParentId: 0,
        requirements: null,
        metaData: [
          {
            key: "h5pFileName",
            value:
              "wwwroot/courses/2/Lernwelt Metriken - 4 H5P/h5p/Suche die Wörter - Metriken",
          },
          {
            key: "h5pContextId",
            value: "1337",
          },
        ],
      },
      {
        id: 5,
        identifier: {
          type: "FileName",
          value: "Verschiebe die Wörter",
        },
        description:
          "Das letzte Spiel dieser Lernwelt überprüft dein Verständnis über Metriken",
        goals:
          "Grundlegende Begriffe über Metriken werden nochmals wiederholt.",
        elementType: "h5p",
        elementValueList: [
          {
            type: "Points",
            value: "30",
          },
        ],
        spaceParentId: 0,
        requirements: null,
        metaData: [
          {
            key: "h5pFileName",
            value:
              "wwwroot/courses/2/Lernwelt Metriken - 4 H5P/h5p/Verschiebe die Wörter",
          },
          {
            key: "h5pContextId",
            value: "1337",
          },
        ],
      },
    ],
  },
};

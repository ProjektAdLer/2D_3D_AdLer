import AWT from "../Types/AWT";
import { MockAdaptivityData } from "./MockAdaptivityData";

const SmallWorldAWT: AWT = {
  fileVersion: "0.4",
  amgVersion: "1.0",
  author: "Ricardo",
  language: "de",
  world: {
    worldName: "Small World",
    worldDescription:
      "Small World with only one topic and one space but with all elements",
    worldGoals: ["Weltziel 1/3", "Weltziel 2/3", "Weltziel 3/3"],
    evaluationLink: "https://www.th-ab.de",
    topics: [
      {
        topicId: 7,
        topicName: "Themenbereich der kleinen Welt",
        topicContents: [1],
      },
    ],
    spaces: [
      {
        spaceId: 1,
        spaceName: "Raum der kleinen Welt",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 2,
        spaceSlotContents: [1, 2, 3, null, 4, null, null, 5, null, 6],
        requiredSpacesToEnter: "",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit",
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit",
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit",
        ],
        spaceTemplate: "L_32x31_10L",
        spaceTemplateStyle: "Campus",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolorekasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            ],
            elementModel: "a_npc_defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
    ],
    elements: [
      {
        $type: "LearningElement",
        elementId: 1,
        elementName: "Ein Text-Lernelement",
        elementCategory: "text",
        elementDescription: "Beschreibung des Text-Lernelements",
        elementGoals: ["Elementziel 1/3", "Elementziel 2/3", "Elementziel 3/3"],
        elementFileType: "text",
        elementMaxScore: 1,
        elementModel: "l_trophy_bronze",
      },
      {
        $type: "LearningElement",
        elementId: 2,
        elementName: "Ein Video-Lernelement",
        elementCategory: "video",
        elementDescription: "Beschreibung des Video-Lernelements",
        elementGoals: ["Elementziel 1/3", "Elementziel 2/3", "Elementziel 3/3"],
        elementFileType: "video",
        elementMaxScore: 1,
        elementModel: "",
      },
      {
        $type: "LearningElement",
        elementId: 3,
        elementName: "Ein Bild-Lernelement",
        elementCategory: "image",
        elementDescription: "Beschreibung des Bild-Lernelements",
        elementGoals: ["Elementziel 1/3", "Elementziel 2/3", "Elementziel 3/3"],
        elementFileType: "image",
        elementMaxScore: 1,
        elementModel: "",
      },
      {
        $type: "AdaptivityElement",
        elementId: 4,
        elementName: "Ein Adaptivitäts-Lernelement",
        elementCategory: "adaptivity",
        elementDescription: "Beschreibung des Adaptivitäts-Lernelements",
        elementGoals: ["Elementziel 1/3", "Elementziel 2/3", "Elementziel 3/3"],
        elementFileType: "text",
        elementMaxScore: 1,
        elementModel: "",
        adaptivityContent: MockAdaptivityData,
      },
      {
        $type: "BaseLearningElement",
        elementId: 999,
        elementName: "Hier steht ein externes Lernelement",
        elementCategory: "text",
        elementFileType: "text",
      },
      {
        $type: "LearningElement",
        elementId: 5,
        elementName: "Ein H5P-Lernelement",
        elementCategory: "primitiveH5P",
        elementDescription: "Beschreibung des H5P-Lernelements",
        elementGoals: ["Elementziel 1/3", "Elementziel 2/3", "Elementziel 3/3"],
        elementFileType: "h5p",
        elementMaxScore: 1,
        elementModel: "l_h5p_blackboard_1",
      },
      {
        $type: "LearningElement",
        elementId: 6,
        elementName: "Ein PDF-Lernelement",
        elementCategory: "pdf",
        elementDescription: "Beschreibung des PDF-Lernelements",
        elementGoals: ["Elementziel 1/3", "Elementziel 2/3", "Elementziel 3/3"],
        elementFileType: "pdf",
        elementMaxScore: 1,
        elementModel: "l_h5p_drawingtable_2",
      },
    ],
  },
};

export default SmallWorldAWT;
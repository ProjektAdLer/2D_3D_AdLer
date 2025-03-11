import AWT from "../Types/AWT";
import { MockAdaptivityData } from "./MockAdaptivityData";

/* istanbul ignore next */
const BigWorldAWT: AWT = {
  fileVersion: "0.3",
  amgVersion: "0.3.2",
  author: "Au Thor",
  language: "de",
  world: {
    worldName: "Story World",
    worldDescription: "Beschreibung der großen Welt",
    worldGoals: ["Weltziel 1/3", "Weltziel 2/3", "Weltziel 3/3"],
    topics: [
      {
        topicId: 1,
        topicName: "Topic 1",
        topicContents: [1, 2],
      },
      {
        topicId: 2,
        topicName: "Topic 2",
        topicContents: [3],
      },
      {
        topicId: 3,
        topicName: "Topic 3",
        topicContents: [4, 5],
      },
    ],
    spaces: [
      {
        spaceId: 1,
        spaceName: "Intro Story",
        spaceDescription: "Ja, der Name dieses Raumes ist extrea so lang",
        spaceGoals: [
          "Ziel des abgeschlossenen Raumes 1/3",
          "Ziel des abgeschlossenen Raumes 2/3",
          "Ziel des abgeschlossenen Raumes 3/3",
        ],
        spaceSlotContents: [1],
        requiredPointsToComplete: 1,
        requiredSpacesToEnter: "",
        spaceTemplate: "R_20X20_6L",
        spaceTemplateStyle: "CAMPUSLIBRARY",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolorekasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: null,
        },
      },
      {
        spaceId: 2,
        spaceName: "Outro Story",
        spaceDescription: "rdescription2",
        spaceGoals: ["rgoals2"],
        spaceSlotContents: [2],
        requiredPointsToComplete: 1,
        requiredSpacesToEnter: "",
        spaceTemplate: "R_20X30_8L",
        spaceTemplateStyle: "CAMPUSMENSA",
        spaceStory: {
          introStory: null,
          outroStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolorekasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
        },
      },
      {
        spaceId: 3,
        spaceName: "Intro + Outro 1 NPC",
        spaceDescription: "rdescription3",
        spaceGoals: ["rgoals3"],
        spaceSlotContents: [3],
        requiredPointsToComplete: 1,
        requiredSpacesToEnter: "",
        spaceTemplate: "D_40X37_15L",
        spaceTemplateStyle: "",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. STORY 3 INTRO!",
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolorekasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a-quizbg-defaultnpc",
          },
        },
      },
      {
        spaceId: 4,
        spaceName: "Intro + Outro 2 NPC",
        spaceDescription: "rdescription4",
        spaceGoals: ["rgoals4"],
        spaceSlotContents: [4],
        requiredPointsToComplete: 1,
        requiredSpacesToEnter: "(3)v((2)^(1))",
        spaceTemplate: "T_40X32_13L",
        spaceTemplateStyle: "",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. STORY 4 INTRO!",
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolorekasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            ],
            elementModel: "a-npc-sheriffjustice",
          },
          outroStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. STORY 4 OUTRO!",
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolorekasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            ],
            elementModel: "a_npc_sheriffjustice",
          },
        },
      },
      {
        spaceId: 5,
        spaceName: "Intro + Outro 2 NPC",
        spaceDescription: "rdescription5",
        spaceGoals: ["rgoals5"],
        spaceSlotContents: [5],
        requiredPointsToComplete: 1,
        requiredSpacesToEnter: "4",
        spaceTemplate: "D_40X37_15L",
        spaceTemplateStyle: "",
        spaceStory: {
          introStory: null,
          outroStory: null,
        },
      },
    ],
    elements: [
      {
        $type: "LearningElement",
        elementId: 1,
        elementName: "Bild welches in Raum 1 abgeschlossen ist",
        elementDescription:
          "Beschreibung des in Raum 1 abgeschlossenen Bild-Lernelements",
        elementGoals: [
          "Ziel des Bild-Lernelements 1/3",
          "Ziel des Bild-Lernelements 2/3",
          "Ziel des Bild-Lernelements 3/3",
        ],
        elementCategory: "image",
        elementFileType: "png",
        elementMaxScore: 1,
        elementModel: "",
      },
      {
        $type: "LearningElement",
        elementId: 2,
        elementName: "Ein PDF-Lernelement",
        elementDescription: "Beschreibung des PDF-Lernelements",
        elementGoals: ["Elementziel 1/3", "Elementziel 2/3", "Elementziel 3/3"],
        elementCategory: "pdf",
        elementFileType: "pdf",
        elementMaxScore: 1,
        elementModel: "",
      },
      {
        $type: "LearningElement",
        elementId: 3,
        elementName: "Ein Text-Lernelement",
        elementDescription: "Beschreibung des Text-Lernelements",
        elementGoals: ["Elementziel 1/3", "Elementziel 2/3", "Elementziel 3/3"],
        elementCategory: "text",
        elementFileType: "txt",
        elementMaxScore: 1,
        elementModel: "",
      },
      {
        $type: "AdaptivityElement",
        elementId: 4,
        elementName: "Ein Adaptivitäts-Lernelement",
        elementDescription: "Beschreibung des Adaptivitäts-Lernelements",
        elementGoals: ["Elementziel 1/3", "Elementziel 2/3", "Elementziel 3/3"],
        elementCategory: "adaptivity",
        elementFileType: "url",
        elementMaxScore: 3,
        elementModel: "",
        adaptivityContent: MockAdaptivityData,
      },
      {
        $type: "LearningElement",
        elementId: 5,
        elementName: "Ein Text-Lernelement",
        elementDescription: "Beschreibung des Text-Lernelements",
        elementGoals: ["Elementziel 1/3", "Elementziel 2/3", "Elementziel 3/3"],
        elementCategory: "text",
        elementFileType: "txt",
        elementMaxScore: 1,
        elementModel: "",
      },
    ],
  },
};

export default BigWorldAWT;

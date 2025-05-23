import AWT from "../Types/AWT";
import { MockAdaptivityData } from "./MockAdaptivityData";

/* istanbul ignore next */
const SubthemeWorldAWT: AWT = {
  fileVersion: "0.4",
  amgVersion: "1.0",
  author: "Ricardo",
  language: "de",
  world: {
    worldName: "Subtheme World",
    worldDescription:
      "Small World with only one topic and one space but with all elements",
    worldGoals: ["Weltziel 1/3", "Weltziel 2/3", "Weltziel 3/3"],
    evaluationLink: "https://www.th-ab.de",
    frameStory: {
      frameStoryIntro:
        "Diese Into Story hat genau 600 Zeichen. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
      frameStoryOutro:
        "Diese Outro Story hat genau 600 Zeichen. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    },
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
        spaceName: "Mensa R6",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [1, null, 2, 5, 4, null],
        requiredSpacesToEnter: "",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],
        spaceTemplate: "R_20X20_6L",
        spaceTemplateStyle: "CAMPUSMENSA",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-npc-averagenerdfemaledark",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 2,
        spaceName: "Mensa R8",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [null, 2, 1, 3, null, 5, 6, null],
        requiredSpacesToEnter: "1",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],

        spaceTemplate: "R_20X30_8L",
        spaceTemplateStyle: "CAMPUSMENSA",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 3,
        spaceName: "Mensa L10",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [null, null, 3, 2, null, 1, 6, null, 5, null],
        requiredSpacesToEnter: "2",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],
        spaceTemplate: "L_32X31_10L",
        spaceTemplateStyle: "CAMPUSMENSA",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 4,
        spaceName: "Mensa T 13",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [
          null,
          6,
          null,
          4,
          null,
          null,
          null,
          null,
          2,
          1,
          null,
          3,
          5,
        ],
        requiredSpacesToEnter: "3",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],
        spaceTemplate: "T_40X32_13L",
        spaceTemplateStyle: "CAMPUSMENSA",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 5,
        spaceName: "Mensa D15",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [
          null,
          2,
          1,
          null,
          null,
          5,
          null,
          null,
          null,
          null,
          null,
          4,
          6,
          null,
          null,
        ],
        requiredSpacesToEnter: "4",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor",
        ],
        spaceTemplate: "D_40X37_15L",
        spaceTemplateStyle: "CAMPUSMENSA",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 6,
        spaceName: "Library R6",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [1, null, 2, 5, 4, null],
        requiredSpacesToEnter: "",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],
        spaceTemplate: "R_20X20_6L",
        spaceTemplateStyle: "CAMPUSLIBRARY",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-npc-averagenerdfemaledark",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 7,
        spaceName: "Library R8",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [null, 2, 1, 3, null, 5, 6, null],
        requiredSpacesToEnter: "1",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],

        spaceTemplate: "R_20X30_8L",
        spaceTemplateStyle: "CAMPUSLIBRARY",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 8,
        spaceName: "Library L10",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [null, null, 3, 2, null, 1, 6, null, 5, null],
        requiredSpacesToEnter: "2",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],
        spaceTemplate: "L_32X31_10L",
        spaceTemplateStyle: "CAMPUSLIBRARY",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 9,
        spaceName: "Library T 13",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [
          null,
          6,
          null,
          4,
          null,
          null,
          null,
          null,
          2,
          1,
          null,
          3,
          5,
        ],
        requiredSpacesToEnter: "3",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],
        spaceTemplate: "T_40X32_13L",
        spaceTemplateStyle: "CAMPUSLIBRARY",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 10,
        spaceName: "Library D15",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [
          null,
          2,
          1,
          null,
          null,
          5,
          null,
          null,
          null,
          null,
          null,
          4,
          6,
          null,
          null,
        ],
        requiredSpacesToEnter: "4",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor",
        ],
        spaceTemplate: "D_40X37_15L",
        spaceTemplateStyle: "CAMPUSLIBRARY",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 11,
        spaceName: "StudentClub R6",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [1, null, 2, 5, 4, null],
        requiredSpacesToEnter: "",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],
        spaceTemplate: "R_20X20_6L",
        spaceTemplateStyle: "CAMPUSSTUDENTCLUB",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-npc-averagenerdfemaledark",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 12,
        spaceName: "StudentClub R8",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [null, 2, 1, 3, null, 5, 6, null],
        requiredSpacesToEnter: "1",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],

        spaceTemplate: "R_20X30_8L",
        spaceTemplateStyle: "CAMPUSSTUDENTCLUB",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 13,
        spaceName: "StudentClub L10",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [null, null, 3, 2, null, 1, 6, null, 5, null],
        requiredSpacesToEnter: "2",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],
        spaceTemplate: "L_32X31_10L",
        spaceTemplateStyle: "CAMPUSSTUDENTCLUB",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 14,
        spaceName: "StudentClub T 13",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [
          null,
          6,
          null,
          4,
          null,
          null,
          null,
          null,
          2,
          1,
          null,
          3,
          5,
        ],
        requiredSpacesToEnter: "3",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],
        spaceTemplate: "T_40X32_13L",
        spaceTemplateStyle: "CAMPUSSTUDENTCLUB",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 15,
        spaceName: "StudentClub D15",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [
          null,
          2,
          1,
          null,
          null,
          5,
          null,
          null,
          null,
          null,
          null,
          4,
          6,
          null,
          null,
        ],
        requiredSpacesToEnter: "4",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor",
        ],
        spaceTemplate: "D_40X37_15L",
        spaceTemplateStyle: "CAMPUSSTUDENTCLUB",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 16,
        spaceName: "ServerRoom R6",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [1, null, 2, 5, 4, null],
        requiredSpacesToEnter: "",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],
        spaceTemplate: "R_20X20_6L",
        spaceTemplateStyle: "CAMPUSSERVERROOM",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-npc-averagenerdfemaledark",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 17,
        spaceName: "ServerRoom R8",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [null, 2, 1, 3, null, 5, 6, null],
        requiredSpacesToEnter: "1",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],

        spaceTemplate: "R_20X30_8L",
        spaceTemplateStyle: "CAMPUSSERVERROOM",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 18,
        spaceName: "ServerRoom L10",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [null, null, 3, 2, null, 1, 6, null, 5, null],
        requiredSpacesToEnter: "2",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],
        spaceTemplate: "L_32X31_10L",
        spaceTemplateStyle: "CAMPUSSERVERROOM",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 19,
        spaceName: "ServerRoom T 13",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [
          null,
          6,
          null,
          4,
          null,
          null,
          null,
          null,
          2,
          1,
          null,
          3,
          5,
        ],
        requiredSpacesToEnter: "3",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],
        spaceTemplate: "T_40X32_13L",
        spaceTemplateStyle: "CAMPUSSERVERROOM",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 20,
        spaceName: "ServerRoom D15",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [
          null,
          2,
          1,
          null,
          null,
          5,
          null,
          null,
          null,
          null,
          null,
          4,
          6,
          null,
          null,
        ],
        requiredSpacesToEnter: "4",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor",
        ],
        spaceTemplate: "D_40X37_15L",
        spaceTemplateStyle: "CAMPUSSERVERROOM",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 21,
        spaceName: "Labor R6",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [1, null, 2, 5, 4, null],
        requiredSpacesToEnter: "",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],
        spaceTemplate: "R_20X20_6L",
        spaceTemplateStyle: "CAMPUSLABOR",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-npc-averagenerdfemaledark",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 22,
        spaceName: "Labor R8",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [null, 2, 1, 3, null, 5, 6, null],
        requiredSpacesToEnter: "1",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],

        spaceTemplate: "R_20X30_8L",
        spaceTemplateStyle: "CAMPUSLABOR",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 23,
        spaceName: "Labor L10",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [null, null, 3, 2, null, 1, 6, null, 5, null],
        requiredSpacesToEnter: "2",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],
        spaceTemplate: "L_32X31_10L",
        spaceTemplateStyle: "CAMPUSLABOR",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 24,
        spaceName: "Labor T 13",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [
          null,
          6,
          null,
          4,
          null,
          null,
          null,
          null,
          2,
          1,
          null,
          3,
          5,
        ],
        requiredSpacesToEnter: "3",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ",
        ],
        spaceTemplate: "T_40X32_13L",
        spaceTemplateStyle: "CAMPUSLABOR",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
          },
          outroStory: {
            storyTexts: ["Tschüss", "Du bist mit diesem Raum fertig"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 25,
        spaceName: "Labor D15",
        spaceDescription: "Raumbeschreibung der kleinen Welt",
        requiredPointsToComplete: 0,
        spaceSlotContents: [
          null,
          2,
          1,
          null,
          null,
          5,
          null,
          null,
          null,
          null,
          null,
          4,
          6,
          null,
          null,
        ],
        requiredSpacesToEnter: "4",
        spaceGoals: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor",
        ],
        spaceTemplate: "D_40X37_15L",
        spaceTemplateStyle: "CAMPUSLABOR",
        spaceStory: {
          introStory: {
            storyTexts: [
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod ",
            ],
            elementModel: "a-quizbg-defaultnpc",
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

export default SubthemeWorldAWT;

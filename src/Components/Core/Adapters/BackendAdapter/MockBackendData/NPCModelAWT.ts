import AWT from "../Types/AWT";

const introNPC = [
  "a-npc-dozentlukas",
  "a-npc-dozentantonia",
  "a-npc-dozentdaniel",
  "a-npc-dozentjoerg",
  "a-npc-dozentgeorg",
  "a-npc-bullydark-male",
  "a-npc-bullylight-male",
  "a-npc-bully-male",
];
const outroNPC = [
  "a-npc-teama-male",
  "a-npc-teame-female",
  "a-npc-teamc-male",
  "a-npc-teamd-male",
  "a-npc-teamb-male",
  "a-npc-bullydark-female",
  "a-npc-bullylight-female",
  "a-npc-bully-female",
];

const spacesMock = [];

for (let i = 0; i < introNPC.length; i++) {
  spacesMock.push({
    spaceId: i + 1,
    spaceName: introNPC[i] + " / " + outroNPC[i],
    requiredPointsToComplete: 0,
    spaceSlotContents: [],
    requiredSpacesToEnter: "",
    spaceTemplate: "R_20X20_6L",
    spaceTemplateStyle: "CampusMensa",
    spaceStory: {
      introStory: {
        storyTexts: [""],
        elementModel: introNPC[i],
      },
      outroStory: {
        storyTexts: [""],
        elementModel: outroNPC[i],
      },
    },
  });
}

/* istanbul ignore next */
const NPCModelAWT: AWT = {
  fileVersion: "0.4",
  amgVersion: "1.0",
  author: "Ricardo",
  language: "de",
  world: {
    worldName: "NPC Models",
    topics: [
      {
        topicId: 0,
        topicName: "",
        topicContents: [1],
      },
    ],
    spaces: spacesMock,
    elements: [],
  },
};

export default NPCModelAWT;

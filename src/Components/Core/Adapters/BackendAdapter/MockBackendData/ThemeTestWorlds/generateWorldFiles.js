const fs = require("fs");
const path = require("path");

const themes = [
  // CampusAB - 7 themes
  { id: 10, name: "Campus AB - Main", theme: "CAMPUSASCHAFFENBURG" },
  {
    id: 11,
    name: "Campus AB - Learning Area",
    theme: "CAMPUSASCHAFFENBURG_LEARNINGAREA",
  },
  {
    id: 12,
    name: "Campus AB - Eating Area",
    theme: "CAMPUSASCHAFFENBURG_EATINGAREA",
  },
  {
    id: 13,
    name: "Campus AB - Presentation",
    theme: "CAMPUSASCHAFFENBURG_PRESENTATION",
  },
  { id: 14, name: "Campus AB - FnE", theme: "CAMPUSASCHAFFENBURG_FNE" },
  {
    id: 15,
    name: "Campus AB - Social Area",
    theme: "CAMPUSASCHAFFENBURG_SOCIALAREA",
  },
  {
    id: 16,
    name: "Campus AB - Technical Area",
    theme: "CAMPUSASCHAFFENBURG_TECHNICALAREA",
  },

  // CampusKE - 7 themes
  { id: 20, name: "Campus KE - Main", theme: "CAMPUSKE" },
  { id: 21, name: "Campus - Mensa", theme: "CAMPUSMENSA" },
  { id: 22, name: "Campus - Library", theme: "CAMPUSLIBRARY" },
  { id: 23, name: "Campus - Student Club", theme: "CAMPUSSTUDENTCLUB" },
  { id: 24, name: "Campus - Server Room", theme: "CAMPUSSERVERROOM" },
  { id: 25, name: "Campus - Labor", theme: "CAMPUSLABOR" },
  { id: 26, name: "Campus - Auditorium", theme: "CAMPUSAUDITORIUM" },

  // Company - 7 themes
  { id: 30, name: "Company - Main", theme: "COMPANY" },
  { id: 31, name: "Company - Learning Area", theme: "COMPANY_LEARNINGAREA" },
  { id: 32, name: "Company - Eating Area", theme: "COMPANY_EATINGAREA" },
  { id: 33, name: "Company - Presentation", theme: "COMPANY_PRESENTATION" },
  { id: 34, name: "Company - FnE", theme: "COMPANY_FNE" },
  { id: 35, name: "Company - Social Area", theme: "COMPANY_SOCIALAREA" },
  { id: 36, name: "Company - Technical Area", theme: "COMPANY_TECHNICALAREA" },
];

const template = (id, name, theme) => `import AWT from "../../Types/AWT";

const World_${id}: AWT = {
  fileVersion: "0.4",
  amgVersion: "1.0",
  author: "Theme Test",
  language: "de",
  world: {
    worldName: "${name}",
    worldDescription: "Test world for ${theme} theme with all floor plans",
    worldGoals: ["Test ${theme} theme", "Verify all floor plans", "Check rendering"],
    evaluationLink: "https://www.th-ab.de",
    topics: [
      {
        topicId: ${id}01,
        topicName: "${name} Test",
        topicContents: [1, 2, 3, 4, 5],
      },
    ],
    spaces: [
      {
        spaceId: 1,
        spaceName: "${name} - R6 Floor Plan",
        spaceDescription: "Rectangle 20x20 with 6 learning elements",
        requiredPointsToComplete: 0,
        spaceSlotContents: [1, null, 2, 3, 4, null],
        requiredSpacesToEnter: "",
        spaceGoals: ["Test R6 floor plan"],
        spaceTemplate: "R_20X20_6L",
        spaceTemplateStyle: "${theme}",
        spaceStory: {
          introStory: {
            storyTexts: ["Welcome to the R6 floor plan test for ${name}"],
            elementModel: "a_npc_defaultnpc",
          },
          outroStory: {
            storyTexts: ["R6 floor plan test completed"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 2,
        spaceName: "${name} - R8 Floor Plan",
        spaceDescription: "Rectangle 20x30 with 8 learning elements",
        requiredPointsToComplete: 0,
        spaceSlotContents: [null, 1, 2, 3, null, 4, 5, null],
        requiredSpacesToEnter: "1",
        spaceGoals: ["Test R8 floor plan"],
        spaceTemplate: "R_20X30_8L",
        spaceTemplateStyle: "${theme}",
        spaceStory: {
          introStory: {
            storyTexts: ["Welcome to the R8 floor plan test for ${name}"],
            elementModel: "a_npc_defaultnpc",
          },
          outroStory: {
            storyTexts: ["R8 floor plan test completed"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 3,
        spaceName: "${name} - L10 Floor Plan",
        spaceDescription: "L-shaped 32x31 with 10 learning elements",
        requiredPointsToComplete: 0,
        spaceSlotContents: [null, null, 1, 2, null, 3, 4, null, 5, null],
        requiredSpacesToEnter: "2",
        spaceGoals: ["Test L10 floor plan"],
        spaceTemplate: "L_32X31_10L",
        spaceTemplateStyle: "${theme}",
        spaceStory: {
          introStory: {
            storyTexts: ["Welcome to the L10 floor plan test for ${name}"],
            elementModel: "a_npc_defaultnpc",
          },
          outroStory: {
            storyTexts: ["L10 floor plan test completed"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 4,
        spaceName: "${name} - T13 Floor Plan",
        spaceDescription: "T-shaped 40x32 with 13 learning elements",
        requiredPointsToComplete: 0,
        spaceSlotContents: [null, 1, null, 2, null, null, null, null, 3, 4, null, 5, 6],
        requiredSpacesToEnter: "3",
        spaceGoals: ["Test T13 floor plan"],
        spaceTemplate: "T_40X32_13L",
        spaceTemplateStyle: "${theme}",
        spaceStory: {
          introStory: {
            storyTexts: ["Welcome to the T13 floor plan test for ${name}"],
            elementModel: "a_npc_defaultnpc",
          },
          outroStory: {
            storyTexts: ["T13 floor plan test completed"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
      {
        spaceId: 5,
        spaceName: "${name} - D15 Floor Plan",
        spaceDescription: "D-shaped 42x36 with 15 learning elements",
        requiredPointsToComplete: 0,
        spaceSlotContents: [null, 1, null, 2, null, 3, null, null, 4, 5, null, null, 6, null, null],
        requiredSpacesToEnter: "4",
        spaceGoals: ["Test D15 floor plan"],
        spaceTemplate: "D_40X37_15L",
        spaceTemplateStyle: "${theme}",
        spaceStory: {
          introStory: {
            storyTexts: ["Welcome to the D15 floor plan test for ${name}"],
            elementModel: "a_npc_defaultnpc",
          },
          outroStory: {
            storyTexts: ["D15 floor plan test completed"],
            elementModel: "a_npc_defaultnpc",
          },
        },
      },
    ],
    elements: [
      {
        $type: "LearningElement",
        elementId: 1,
        elementName: "Test H5P Element",
        elementDescription: "H5P element for testing",
        elementGoals: ["Test goal"],
        elementCategory: "h5p",
        elementFileType: "h5p",
        elementMaxScore: 100,
        elementModel: "",
      },
      {
        $type: "LearningElement",
        elementId: 2,
        elementName: "Test Text Element",
        elementDescription: "Text element for testing",
        elementGoals: ["Test goal"],
        elementCategory: "text",
        elementFileType: "txt",
        elementMaxScore: 0,
        elementModel: "",
      },
      {
        $type: "LearningElement",
        elementId: 3,
        elementName: "Test Image Element",
        elementDescription: "Image element for testing",
        elementGoals: ["Test goal"],
        elementCategory: "image",
        elementFileType: "png",
        elementMaxScore: 0,
        elementModel: "",
      },
      {
        $type: "LearningElement",
        elementId: 4,
        elementName: "Test Video Element",
        elementDescription: "Video element for testing",
        elementGoals: ["Test goal"],
        elementCategory: "video",
        elementFileType: "mp4",
        elementMaxScore: 0,
        elementModel: "",
      },
      {
        $type: "LearningElement",
        elementId: 5,
        elementName: "Test PDF Element",
        elementDescription: "PDF element for testing",
        elementGoals: ["Test goal"],
        elementCategory: "text",
        elementFileType: "pdf",
        elementMaxScore: 0,
        elementModel: "",
      },
      {
        $type: "LearningElement",
        elementId: 6,
        elementName: "Test Adaptivity Element",
        elementDescription: "Adaptivity element for testing",
        elementGoals: ["Test goal"],
        elementCategory: "adaptivity",
        elementFileType: "json",
        elementMaxScore: 100,
        elementModel: "",
      },
    ],
  },
};

export default World_${id};
`;

themes.forEach(({ id, name, theme }) => {
  const fileName = `World_${id}.ts`;
  const filePath = path.join(__dirname, fileName);
  const content = template(id, name, theme);
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Created ${fileName}`);
});

console.log(`\n✓ Created ${themes.length} world files`);

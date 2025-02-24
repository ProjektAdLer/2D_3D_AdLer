/**
 * Represents a color in the avatar color palette.
 */
export interface AvatarColor {
  /**
   * The id of the color on the color palette.
   */
  id: number;

  /**
   * The key for the name of the color, used for localization.
   */
  nameKey: string;

  /**
   * The hexadecimal representation of the color.
   */
  hexColor: string;

  uOffset?: number;
  vOffset?: number;
}

const AvatarColorPalette: AvatarColor[] = [
  // Grey
  { id: 0, nameKey: "Grey 1", hexColor: "#000000", uOffset: 0, vOffset: 0 },
  {
    id: 1,
    nameKey: "Grey 2",
    hexColor: "#1b1b1b",
    uOffset: 0.125,
    vOffset: 0,
  },
  { id: 2, nameKey: "Grey 3", hexColor: "#313131", uOffset: 0.25, vOffset: 0 },
  {
    id: 3,
    nameKey: "Grey 4",
    hexColor: "#555555",
    uOffset: 0.375,
    vOffset: 0,
  },
  { id: 4, nameKey: "Grey 5", hexColor: "#767676", uOffset: 0.5, vOffset: 0 },
  {
    id: 5,
    nameKey: "Grey 6",
    hexColor: "#949494",
    uOffset: 0.625,
    vOffset: 0,
  },
  { id: 6, nameKey: "Grey 7", hexColor: "#b3b3b3", uOffset: 0.75, vOffset: 0 },
  {
    id: 7,
    nameKey: "Grey 8",
    hexColor: "#cecece",
    uOffset: 0.875,
    vOffset: 0,
  },

  // Blue
  { id: 8, nameKey: "Blue 1", hexColor: "#043675", uOffset: 0, vOffset: 0.125 },
  {
    id: 9,
    nameKey: "Blue 2",
    hexColor: "#043675",
    uOffset: 0.125,
    vOffset: 0.125,
  },
  {
    id: 10,
    nameKey: "Blue 3",
    hexColor: "#2f91cd",
    uOffset: 0.25,
    vOffset: 0.125,
  },
  {
    id: 11,
    nameKey: "Blue 4",
    hexColor: "#83aece",
    uOffset: 0.375,
    vOffset: 0.125,
  },
  {
    id: 12,
    nameKey: "Blue 5",
    hexColor: "#17607f",
    uOffset: 0.5,
    vOffset: 0.125,
  },
  {
    id: 13,
    nameKey: "Blue 6",
    hexColor: "#5398b0",
    uOffset: 0.625,
    vOffset: 0.125,
  },
  {
    id: 14,
    nameKey: "Blue 7",
    hexColor: "#94b7c3",
    uOffset: 0.75,
    vOffset: 0.125,
  },
  {
    id: 15,
    nameKey: "Blue 8",
    hexColor: "#b4c6ce",
    uOffset: 0.875,
    vOffset: 0.125,
  },

  // Red
  { id: 16, nameKey: "Red 1", hexColor: "#8b1518", uOffset: 0, vOffset: 0.25 },
  {
    id: 17,
    nameKey: "Red 2",
    hexColor: "#a41e22",
    uOffset: 0.125,
    vOffset: 0.25,
  },
  {
    id: 18,
    nameKey: "Red 3",
    hexColor: "#bd2c30",
    uOffset: 0.25,
    vOffset: 0.25,
  },
  {
    id: 19,
    nameKey: "Red 4",
    hexColor: "#ce4145",
    uOffset: 0.375,
    vOffset: 0.25,
  },
  {
    id: 20,
    nameKey: "Red 5",
    hexColor: "#871a0b",
    uOffset: 0.5,
    vOffset: 0.25,
  },
  {
    id: 21,
    nameKey: "Red 6",
    hexColor: "#a8411e",
    uOffset: 0.625,
    vOffset: 0.25,
  },
  {
    id: 22,
    nameKey: "Red 7",
    hexColor: "#c1643f",
    uOffset: 0.75,
    vOffset: 0.25,
  },
  {
    id: 23,
    nameKey: "Red 8",
    hexColor: "#cdada2",
    uOffset: 0.875,
    vOffset: 0.25,
  },
  // Orange
  {
    id: 24,
    nameKey: "Orange 1",
    hexColor: "#b76000",
    uOffset: 0,
    vOffset: 0.375,
  },
  {
    id: 25,
    nameKey: "Orange 2",
    hexColor: "#c98300",
    uOffset: 0.125,
    vOffset: 0.375,
  },
  {
    id: 26,
    nameKey: "Orange 3",
    hexColor: "#cea100",
    uOffset: 0.25,
    vOffset: 0.375,
  },
  {
    id: 27,
    nameKey: "Orange 4",
    hexColor: "#ceb753",
    uOffset: 0.375,
    vOffset: 0.375,
  },
  {
    id: 28,
    nameKey: "Orange 5",
    hexColor: "#aa9501",
    uOffset: 0.5,
    vOffset: 0.375,
  },
  {
    id: 29,
    nameKey: "Orange 6",
    hexColor: "#c2af09",
    uOffset: 0.625,
    vOffset: 0.375,
  },
  {
    id: 30,
    nameKey: "Orange 7",
    hexColor: "#ccc428",
    uOffset: 0.75,
    vOffset: 0.375,
  },
  {
    id: 31,
    nameKey: "Orange 8",
    hexColor: "#cccaa5",
    uOffset: 0.875,
    vOffset: 0.375,
  },
  // Brown
  { id: 32, nameKey: "Brown 1", hexColor: "#25160c", uOffset: 0, vOffset: 0.5 },
  {
    id: 33,
    nameKey: "Brown 2",
    hexColor: "#4b2a1a",
    uOffset: 0.125,
    vOffset: 0.5,
  },
  {
    id: 34,
    nameKey: "Brown 3",
    hexColor: "#633d29",
    uOffset: 0.25,
    vOffset: 0.5,
  },
  {
    id: 35,
    nameKey: "Brown 4",
    hexColor: "#835b32",
    uOffset: 0.375,
    vOffset: 0.5,
  },
  {
    id: 36,
    nameKey: "Brown 5",
    hexColor: "#bb9871",
    uOffset: 0.5,
    vOffset: 0.5,
  },
  {
    id: 37,
    nameKey: "Brown 6",
    hexColor: "#a6947d",
    uOffset: 0.625,
    vOffset: 0.5,
  },
  {
    id: 38,
    nameKey: "Brown 7",
    hexColor: "#b1a28b",
    uOffset: 0.75,
    vOffset: 0.5,
  },
  {
    id: 39,
    nameKey: "Brown 8",
    hexColor: "#bba989",
    uOffset: 0.875,
    vOffset: 0.5,
  },
  // more Brown
  {
    id: 40,
    nameKey: "Brown 9",
    hexColor: "#7d4337",
    uOffset: 0,
    vOffset: 0.625,
  },
  {
    id: 41,
    nameKey: "Brown 10",
    hexColor: "#b97947",
    uOffset: 0.125,
    vOffset: 0.625,
  },
  {
    id: 42,
    nameKey: "Brown 11",
    hexColor: "#ac7d59",
    uOffset: 0.25,
    vOffset: 0.625,
  },
  {
    id: 43,
    nameKey: "Brown 12",
    hexColor: "#677f88",
    uOffset: 0.375,
    vOffset: 0.625,
  },
  {
    id: 44,
    nameKey: "Brown 13",
    hexColor: "#b29676",
    uOffset: 0.5,
    vOffset: 0.625,
  },
  {
    id: 45,
    nameKey: "Brown 14",
    hexColor: "#bfa183",
    uOffset: 0.625,
    vOffset: 0.625,
  },
  {
    id: 46,
    nameKey: "Brown 15",
    hexColor: "#c9b2a6",
    uOffset: 0.75,
    vOffset: 0.625,
  },
  {
    id: 47,
    nameKey: "Brown 16",
    hexColor: "#ccbeb8",
    uOffset: 0.875,
    vOffset: 0.625,
  },
  // violet
  {
    id: 48,
    nameKey: "Violet 1",
    hexColor: "#a909b3",
    uOffset: 0,
    vOffset: 0.75,
  },
  {
    id: 49,
    nameKey: "Violet 2",
    hexColor: "#c55eca",
    uOffset: 0.125,
    vOffset: 0.75,
  },
  {
    id: 50,
    nameKey: "Violet 3",
    hexColor: "#c8a6cb",
    uOffset: 0.25,
    vOffset: 0.75,
  },
  {
    id: 51,
    nameKey: "Violet 4",
    hexColor: "#cbc0cc",
    uOffset: 0.375,
    vOffset: 0.75,
  },
  {
    id: 52,
    nameKey: "Violet 5",
    hexColor: "#500c8c",
    uOffset: 0.5,
    vOffset: 0.75,
  },
  {
    id: 53,
    nameKey: "Violet 6",
    hexColor: "#863fb3",
    uOffset: 0.625,
    vOffset: 0.75,
  },
  {
    id: 54,
    nameKey: "Violet 7",
    hexColor: "#a370c3",
    uOffset: 0.75,
    vOffset: 0.75,
  },
  {
    id: 55,
    nameKey: "Violet 8",
    hexColor: "#bdaacb",
    uOffset: 0.875,
    vOffset: 0.75,
  },
  // green
  {
    id: 56,
    nameKey: "Green 1",
    hexColor: "#0d5502",
    uOffset: 0,
    vOffset: 0.875,
  },
  {
    id: 57,
    nameKey: "Green 2",
    hexColor: "#199a09",
    uOffset: 0.125,
    vOffset: 0.875,
  },
  {
    id: 58,
    nameKey: "Green 3",
    hexColor: "#3ac61e",
    uOffset: 0.25,
    vOffset: 0.875,
  },
  {
    id: 59,
    nameKey: "Green 4",
    hexColor: "#82ce84",
    uOffset: 0.375,
    vOffset: 0.875,
  },
  {
    id: 60,
    nameKey: "Green 5",
    hexColor: "#3b6613",
    uOffset: 0.5,
    vOffset: 0.875,
  },
  {
    id: 61,
    nameKey: "Green 6",
    hexColor: "#709636",
    uOffset: 0.625,
    vOffset: 0.875,
  },
  {
    id: 62,
    nameKey: "Green 7",
    hexColor: "#9db16b",
    uOffset: 0.75,
    vOffset: 0.875,
  },
  {
    id: 63,
    nameKey: "Green 8",
    hexColor: "#bdc6a5",
    uOffset: 0.875,
    vOffset: 0.875,
  },
];

export default AvatarColorPalette;

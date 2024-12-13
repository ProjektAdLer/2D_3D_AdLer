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
}

const AvatarColorPalette: AvatarColor[] = [
  // Black
  { id: 0, nameKey: "Black 1", hexColor: "#000000" },
  { id: 1, nameKey: "Black 2", hexColor: "#1b1b1b" },
  { id: 2, nameKey: "Black 3", hexColor: "#313131" },
  { id: 3, nameKey: "Black 4", hexColor: "#555555" },
  { id: 4, nameKey: "Black 5", hexColor: "#767676" },
  { id: 5, nameKey: "Black 6", hexColor: "#949494" },
  { id: 6, nameKey: "Black 7", hexColor: "#b3b3b3" },
  { id: 7, nameKey: "Black 8", hexColor: "#cecece" },
  // Blue
  { id: 8, nameKey: "Blue 1", hexColor: "#043675" },
  { id: 9, nameKey: "Blue 2", hexColor: "#043675" }, // duplicate
  { id: 10, nameKey: "Blue 3", hexColor: "#2f91cd" },
  { id: 11, nameKey: "Blue 4", hexColor: "#83aece" },
  { id: 12, nameKey: "Blue 5", hexColor: "#17607f" },
  { id: 13, nameKey: "Blue 6", hexColor: "#5398b0" },
  { id: 14, nameKey: "Blue 7", hexColor: "#94b7c3" },
  { id: 15, nameKey: "Blue 8", hexColor: "#b4c6ce" },
  // Red
  { id: 16, nameKey: "Red 1", hexColor: "#8b1518" },
  { id: 17, nameKey: "Red 2", hexColor: "#a41e22" },
  { id: 18, nameKey: "Red 3", hexColor: "#bd2c30" },
  { id: 19, nameKey: "Red 4", hexColor: "#ce4145" },
  { id: 20, nameKey: "Red 5", hexColor: "#871a0b" },
  { id: 21, nameKey: "Red 6", hexColor: "#a8411e" },
  { id: 22, nameKey: "Red 7", hexColor: "#c1643f" },
  { id: 23, nameKey: "Red 8", hexColor: "#cdada2" },
  // Orange
  { id: 24, nameKey: "Orange 1", hexColor: "#b76000" },
  { id: 25, nameKey: "Orange 2", hexColor: "#c98300" },
  { id: 26, nameKey: "Orange 3", hexColor: "#cea100" },
  { id: 27, nameKey: "Orange 4", hexColor: "#ceb753" },
  { id: 28, nameKey: "Orange 5", hexColor: "#aa9501" },
  { id: 29, nameKey: "Orange 6", hexColor: "#c2af09" },
  { id: 30, nameKey: "Orange 7", hexColor: "#ccc428" },
  { id: 31, nameKey: "Orange 8", hexColor: "#cccaa5" },
  // Brown
  { id: 32, nameKey: "Brown 1", hexColor: "#25160c" },
  { id: 33, nameKey: "Brown 2", hexColor: "#4b2a1a" },
  { id: 34, nameKey: "Brown 3", hexColor: "#633d29" },
  { id: 35, nameKey: "Brown 4", hexColor: "#835b32" },
  { id: 36, nameKey: "Brown 5", hexColor: "#bb9871" },
  { id: 37, nameKey: "Brown 6", hexColor: "#a6947d" },
  { id: 38, nameKey: "Brown 7", hexColor: "#b1a28b" },
  { id: 39, nameKey: "Brown 8", hexColor: "#bba989" },
  // more Brown
  { id: 40, nameKey: "Brown 9", hexColor: "#7d4337" },
  { id: 41, nameKey: "Brown 10", hexColor: "#b97947" },
  { id: 42, nameKey: "Brown 11", hexColor: "#ac7d59" },
  { id: 43, nameKey: "Brown 12", hexColor: "#677f88" },
  { id: 44, nameKey: "Brown 13", hexColor: "#b29676" },
  { id: 45, nameKey: "Brown 14", hexColor: "#bfa183" },
  { id: 46, nameKey: "Brown 15", hexColor: "#c9b2a6" },
  { id: 47, nameKey: "Brown 16", hexColor: "#ccbeb8" },
  // violet
  { id: 48, nameKey: "Violet 1", hexColor: "#a909b3" },
  { id: 49, nameKey: "Violet 2", hexColor: "#c55eca" },
  { id: 50, nameKey: "Violet 3", hexColor: "#c8a6cb" },
  { id: 51, nameKey: "Violet 4", hexColor: "#cbc0cc" },
  { id: 52, nameKey: "Violet 5", hexColor: "#500c8c" },
  { id: 53, nameKey: "Violet 6", hexColor: "#863fb3" },
  { id: 54, nameKey: "Violet 7", hexColor: "#a370c3" },
  { id: 55, nameKey: "Violet 8", hexColor: "#bdaacb" },
  // green
  { id: 56, nameKey: "Green 1", hexColor: "#0d5502" },
  { id: 57, nameKey: "Green 2", hexColor: "#199a09" },
  { id: 58, nameKey: "Green 3", hexColor: "#3ac61e" },
  { id: 59, nameKey: "Green 4", hexColor: "#82ce84" },
  { id: 60, nameKey: "Green 5", hexColor: "#3b6613" },
  { id: 61, nameKey: "Green 6", hexColor: "#709636" },
  { id: 62, nameKey: "Green 7", hexColor: "#9db16b" },
  { id: 63, nameKey: "Green 8", hexColor: "#bdc6a5" },
];

export default AvatarColorPalette;

export interface AvatarUVOffset {
  id: number;
  name: string;
  uOffset: number;
  vOffset: number;
}

/**
  To add new Texture:
  1. increment variable numberOf[...]
  2. change uv-offsets of corresponding texture, if it has changed
  3. If new texture is a pair of eyes: add name of texture to bottom of name list of eyes 
*/

const numberOfEyebrows = 12;
const AvatarEyeBrowTexture: AvatarUVOffset[] = [];
for (let y = 0; y < Math.ceil(numberOfEyebrows / 4); y++) {
  for (let x = 0; x < 4; x++) {
    if (AvatarEyeBrowTexture.length === numberOfEyebrows) break;
    AvatarEyeBrowTexture.push({
      id: x + y * 4,
      name: "Brows_" + (1 + x + y * 4).toString(),
      uOffset: x * 0.2497,
      vOffset: y * 0.249,
    });
  }
}
export { AvatarEyeBrowTexture };

const numberOfEyes = 36;
const AvatarEyeTexture: AvatarUVOffset[] = [];
for (let y = 0; y < Math.ceil(numberOfEyes / 4); y++) {
  for (let x = 0; x < 4; x++) {
    if (AvatarEyeTexture.length === numberOfEyes) break;
    AvatarEyeTexture.push({
      id: x + y * 4,
      name:
        [
          "Neural_Eyes_",
          "Female_Eyes_",
          "Angry_Eyes_",
          "Specular_Eyes_",
          "Tired_Eyes_",
          "Makeup_Eyes_",
          "Old_Eyes_",
          "Crooked_Eyes_",
          "Small_Eyes_",
        ][y] + (1 + x).toString(),
      uOffset: x * 0.2498,
      vOffset: y * 0.09975,
    });
  }
}
export { AvatarEyeTexture };

const numberOfNoses = 18;
const AvatarNoseTexture: AvatarUVOffset[] = [];
for (let y = 0; y < Math.ceil(numberOfNoses / 6); y++) {
  for (let x = 0; x < 6; x++) {
    if (AvatarNoseTexture.length === numberOfNoses) break;
    AvatarNoseTexture.push({
      id: x + y * 6,
      name: "Nose_" + (1 + x + y * 6).toString(),
      uOffset: x * 0.1665,
      vOffset: y * 0.249,
    });
  }
}
export { AvatarNoseTexture };

const numberOfMouths = 30;
const AvatarMouthTexture: AvatarUVOffset[] = [];
for (let y = 0; y < Math.ceil(numberOfMouths / 6); y++) {
  for (let x = 0; x < 6; x++) {
    if (AvatarMouthTexture.length === numberOfMouths) break;
    AvatarMouthTexture.push({
      id: x + y * 6,
      name: "Mouth_" + (1 + x + y * 6).toString(),
      uOffset: x * 0.1666,
      vOffset: y * 0.166,
    });
    AvatarMouthTexture[x + y * 6].id = x + y * 6;
    AvatarMouthTexture[x + y * 6].name = "Mouth_" + (1 + x + y * 6).toString();
    AvatarMouthTexture[x + y * 6].uOffset = x * 0.1666;
    AvatarMouthTexture[x + y * 6].vOffset = y * 0.166;
  }
}
export { AvatarMouthTexture };

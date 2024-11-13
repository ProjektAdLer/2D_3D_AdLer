export const OAvatarEditorCategory = {
  HAIR: 0,
  FACE: 1,
  ACCESSOIRE: 2,
  CLOTHING: 3,
} as const;

export type AvatarEditorCategory =
  (typeof OAvatarEditorCategory)[keyof typeof OAvatarEditorCategory];

export const OAvatarEditorCategory = {
  HAIR: 0,
  FACE: 1,
  ACCESSOIRE: 2,
  CLOTHING: 3,
  BODY: 4,
} as const;

export type AvatarEditorCategory =
  (typeof OAvatarEditorCategory)[keyof typeof OAvatarEditorCategory];

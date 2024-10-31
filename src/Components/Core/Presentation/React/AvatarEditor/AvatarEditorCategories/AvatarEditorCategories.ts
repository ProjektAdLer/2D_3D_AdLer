export const OAvatarEditorCategory = {
  HAIR: 0,
  FACE: 1,
} as const;

export type AvatarEditorCategory =
  (typeof OAvatarEditorCategory)[keyof typeof OAvatarEditorCategory];

/** binary encoded:
 * 00 - none
 * 01 - intro
 * 10 - outro
 * 11 - intro and outro
 */
export enum StoryElementType {
  None = 0, // 00
  Intro = 1, // 01
  Outro = 2, // 10
  IntroOutro = 3, // 11
}

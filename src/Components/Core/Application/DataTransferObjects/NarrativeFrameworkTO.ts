import { ThemeType } from "../../Domain/Types/ThemeTypes";

export default class NarrativeFrameworkTO {
  introText?: string;
  outroText?: string;
  theme: ThemeType;
  shownBefore: boolean;
}

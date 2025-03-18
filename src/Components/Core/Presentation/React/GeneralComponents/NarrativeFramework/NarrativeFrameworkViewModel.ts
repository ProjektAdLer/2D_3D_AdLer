import { LearningSpaceThemeType } from "src/Components/Core/Domain/Types/LearningSpaceThemeTypes";
import Observable from "src/Lib/Observable";

export default class NarrativeFrameworkViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>(true);

  introText?: string =
    "Die Jedi sind die Friedenswächter der Galaxis. Sie nutzen ihre Kraft zur Verteidigung und zum Schutz anderer, nie jedoch zum Angriff. Die Jedi achten alles Leben, in jeder Form. Die Jedi dienen, anstatt zu herrschen, zum Wohle der Galaxis. Die Jedi streben nach Vervollkommnung durch Wissen und Ausbildung. Die Jedi leben in der Macht. Die Macht ist die Energie, die alles Leben verbindet, die Macht umgibt uns, sie durchdringt uns, sie hält die Galaxis zusammen. Die Jedi vertrauen auf die Macht. Möge die Macht mit dir sein. Immer. Ich war dein Bruder Anakin. Ich liebte dich. Ich hasse dich! Meis.";
  outroText?: string =
    "Und wenn sie nicht gestorben sind, dann leben sie noch heute.";
  theme: LearningSpaceThemeType;
}

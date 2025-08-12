import { ThemeType } from "src/Components/Core/Domain/Types/ThemeTypes";
import IAsyncPresentationBuilder from "../../PresentationBuilder/IAsyncPresentationBuilder";

export interface IAmbienceBuilder extends IAsyncPresentationBuilder {
  theme: ThemeType;
}

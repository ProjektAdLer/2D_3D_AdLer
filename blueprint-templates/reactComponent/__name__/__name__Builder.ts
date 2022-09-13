import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import {{name}}Controller from "./{{name}}Controller";
import {{name}}Presenter from "./{{name}}Presenter";
import I{{name}}Controller from "./I{{name}}Controller";
import I{{name}}Presenter from "./I{{name}}Presenter";
import {{name}}ViewModel from "./{{name}}ViewModel";

/*
This Template Provides the whole scaffolding for a React Component.
Copy below lines in the DI Container and its Types

bind<IPresentationBuilder>(BUILDER_TYPES.I{{name}}Builder).to({{name}}Builder);
I{{name}}Builder: Symbol("I{{name}}Builder"),

director.Builder = CoreDIContainer.get<IPresentationBuilder>(
  BUILDER_TYPES.I{{name}}Builder
);
director.build();
*/

@injectable()
export default class {{name}}Builder extends PresentationBuilder<
  {{name}}ViewModel,
  I{{name}}Controller,
  undefined,
  I{{name}}Presenter
> {
  constructor() {
    super(
      {{name}}ViewModel,
      {{name}}Controller,
      undefined,
      {{name}}Presenter
    );
  }
}

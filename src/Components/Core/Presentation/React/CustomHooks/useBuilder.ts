import { interfaces } from "inversify";
import { useInjection } from "inversify-react";
import { useState, useEffect } from "react";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import IPresentationBuilder from "../../PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";

export default function useBuilder<ViewModel, Controller>(
  builderType: interfaces.ServiceIdentifier<IPresentationBuilder>
): [ViewModel | undefined, Controller | undefined] {
  const director = useInjection<IPresentationDirector>(
    BUILDER_TYPES.IPresentationDirector
  );
  const builder = useInjection<IPresentationBuilder>(builderType);

  const [controller, setController] = useState<Controller>();
  const [viewModel, setViewModel] = useState<ViewModel>();

  useEffect(() => {
    director.build(builder);

    setController(builder.getController());
    setViewModel(builder.getViewModel());
  }, []);

  return [viewModel, controller];
}

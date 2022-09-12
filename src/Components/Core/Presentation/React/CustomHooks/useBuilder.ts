import { interfaces } from "inversify";
import { useInjection } from "inversify-react";
import { useState } from "react";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import IPresentationBuilder from "../../PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";

export default function useBuilder<ViewModel, Controller>(
  builderType: interfaces.ServiceIdentifier<IPresentationBuilder>
): [ViewModel, Controller] {
  const director = useInjection<IPresentationDirector>(
    BUILDER_TYPES.IPresentationDirector
  );
  const builder = useInjection<IPresentationBuilder>(builderType);

  const [[viewModel, controller]] = useState<[ViewModel, Controller]>(() => {
    director.build(builder);
    return [builder.getViewModel(), builder.getController()];
  });

  return [viewModel, controller];
}

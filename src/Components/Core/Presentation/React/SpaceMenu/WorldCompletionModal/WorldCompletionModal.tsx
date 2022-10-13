import React from "react";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import IWorldCompletionModalController from "./IWorldCompletionModalController";
import WorldCompletionModalViewModel from "./WorldCompletionModalViewModel";

export default function WorldCompletionModal() {
  const [viewModel, controller] = useBuilder<
    WorldCompletionModalViewModel,
    IWorldCompletionModalController
  >(BUILDER_TYPES.IWorldCompletionModalBuilder);

  if (!viewModel || !controller) return null;

  return <div>WorldCompletionModal</div>;
}

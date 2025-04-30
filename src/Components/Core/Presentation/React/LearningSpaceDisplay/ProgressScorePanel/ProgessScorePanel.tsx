import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import LearningSpaceScorePanel from "./LearningSpaceScorePanel/LearningSpaceScorePanel";
import LearningWorldScorePanel from "./LearningWorldScorePanel/LearningWorldScorePanel";
import ProgressScorePanelViewModel from "./ProgessScorePanelViewModel";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { GradingStyle } from "src/Components/Core/Domain/Types/GradingStyle";

export default function ProgressScorePanel() {
  const [viewModel] = useBuilder<ProgressScorePanelViewModel, undefined>(
    BUILDER_TYPES.IProgressScorePanelBuilder,
  );

  if (!viewModel) return null;
  if (!viewModel.gradingStyle) return null;

  return (
    <>
      {viewModel.gradingStyle === GradingStyle.point && (
        <>
          <LearningWorldScorePanel />
          <LearningSpaceScorePanel />
        </>
      )}
    </>
  );
}

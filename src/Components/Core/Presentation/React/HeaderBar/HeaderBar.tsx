import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/CustomHooks/useBuilder";
import StyledButton from "~ReactComponents/ReactBaseComponents/StyledButton";
import StyledContainer from "~ReactComponents/ReactBaseComponents/StyledContainer";
import HeaderBarController from "./HeaderBarController";
import HeaderBarViewModel from "./HeaderBarViewModel";

export default function HeaderBar() {
  const [viewModel, controller] = useBuilder<
    HeaderBarViewModel,
    HeaderBarController
  >(BUILDER_TYPES.IHeaderBarBuilder);

  if (!viewModel || !controller) return null;

  return (
    <StyledContainer>
      <StyledButton onClick={controller.onMenuButtonClicked}>Menu</StyledButton>
      <StyledButton onClick={controller.onBackButtonClicked}>Back</StyledButton>
      {viewModel.title.Value}
    </StyledContainer>
  );
}

import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import WorldMenuButtonViewModel from "./WorldMenuButtonViewModel";
import history from "history/browser";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";

export default function WorldMenuButton() {
  const [viewModel] = useBuilder<WorldMenuButtonViewModel, undefined>(
    BUILDER_TYPES.IWorldMenuButtonBuilder
  );
  const [loggedInMoodle] = useObservable<boolean>(viewModel?.loggedInMoodle);
  return (
    <div>
      <StyledButton
        shape="freefloatleft"
        disabled={!loggedInMoodle}
        onClick={() => history.push("/spacemenu")}
      >
        Gehe zum Lernraum Menü
      </StyledButton>
    </div>
  );
}

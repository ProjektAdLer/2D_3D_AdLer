import { AdaptivityElementActionTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementActionTypes";
import { AdaptivityHint } from "../AdaptivityElementViewModel";
import { useEffect } from "react";

export default function AdaptivityElementHint({
  hint,
  setHeaderText,
}: {
  hint: AdaptivityHint;
  setHeaderText: (headerText: string) => void;
}) {
  useEffect(() => {
    setHeaderText("HINT_PLACEHOLDER_HEADER");
  }, [setHeaderText]);

  return (
    <>
      {hint.hintAction.hintActionType ===
        AdaptivityElementActionTypes.CommentAction &&
        hint.hintAction.textData !== undefined && (
          <div>{hint.hintAction.textData}</div>
        )}

      {hint.hintAction.hintActionType ===
        AdaptivityElementActionTypes.ContentAction && null}

      {hint.hintAction.hintActionType ===
        AdaptivityElementActionTypes.ReferenceAction &&
        hint.hintAction.textData !== undefined && (
          <div>{hint.hintAction.textData}</div>
        )}
    </>
  );
}

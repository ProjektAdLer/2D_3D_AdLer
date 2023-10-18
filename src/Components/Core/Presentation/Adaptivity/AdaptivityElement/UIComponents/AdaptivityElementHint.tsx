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
        AdaptivityElementActionTypes.CommentAction && (
        <div>{hint.hintAction.hintActionData}</div>
      )}
      {hint.hintAction.hintActionType ===
        AdaptivityElementActionTypes.ContentAction && null}
      {hint.hintAction.hintActionType ===
        AdaptivityElementActionTypes.ReferenceAction && null}
    </>
  );
}

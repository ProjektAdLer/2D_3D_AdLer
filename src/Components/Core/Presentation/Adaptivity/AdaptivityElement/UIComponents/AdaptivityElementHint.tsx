import { AdaptivityElementActionTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementActionTypes";
import { AdaptivityHint } from "../AdaptivityElementViewModel";

export default function AdaptivityElementHint({
  hint,
}: {
  hint: AdaptivityHint;
}) {
  return (
    <>
      {hint.hintAction.hintActionType ===
        AdaptivityElementActionTypes.CommentAction && (
        <div>hint.hintAction.hintActionData</div>
      )}
      {hint.hintAction.hintActionType ===
        AdaptivityElementActionTypes.ContentAction && null}
      {hint.hintAction.hintActionType ===
        AdaptivityElementActionTypes.ReferenceAction && null}
    </>
  );
}

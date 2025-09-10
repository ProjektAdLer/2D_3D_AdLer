import { AdaptivityElementActionTypes } from "src/Components/Core/Domain/Types/Adaptivity/AdaptivityElementActionTypes";
import { AdaptivityHint } from "../AdaptivityElementViewModel";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function AdaptivityElementHint({
  hint,
  setHeaderText,
  closeHint,
}: {
  hint: AdaptivityHint;
  setHeaderText: (headerText: string) => void;
  closeHint: () => void;
}) {
  const { t: translate } = useTranslation("learningElement");

  useEffect(() => {
    setHeaderText(translate("hintTitle"));
  }, [setHeaderText, translate]);

  return (
    <>
      {hint.hintAction.hintActionType ===
        AdaptivityElementActionTypes.CommentAction &&
        hint.hintAction.textData !== undefined && (
          <div className="my-4 flex items-center justify-center rounded-xl bg-buttonbgblue p-2 pl-4">
            {hint.hintAction.textData}
          </div>
        )}

      {hint.hintAction.hintActionType ===
        AdaptivityElementActionTypes.ContentAction &&
        hint.hintAction.textData !== undefined && (
          <div className="my-4 flex items-center justify-center rounded-xl bg-buttonbgblue p-2 pl-4">
            {hint.hintAction.textData}
          </div>
        )}

      {hint.hintAction.hintActionType ===
        AdaptivityElementActionTypes.ReferenceAction &&
        hint.hintAction.textData !== undefined && (
          <div>{hint.hintAction.textData}</div>
        )}
      <div className="flex w-full justify-end">
        <StyledButton
          shape="freeFloatCenter"
          onClick={closeHint}
          data-testid="adaptivity-closehint"
        >
          <p className="text-sm">{translate("nextButton")}</p>
        </StyledButton>
      </div>
    </>
  );
}

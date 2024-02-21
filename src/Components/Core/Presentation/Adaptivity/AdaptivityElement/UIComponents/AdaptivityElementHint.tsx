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
          <div className="flex items-center justify-center p-2 pl-4 my-4 bg-buttonbgblue rounded-xl">
            {hint.hintAction.textData}
          </div>
        )}

      {hint.hintAction.hintActionType ===
        AdaptivityElementActionTypes.ContentAction && null}

      {hint.hintAction.hintActionType ===
        AdaptivityElementActionTypes.ReferenceAction &&
        hint.hintAction.textData !== undefined && (
          <div>{hint.hintAction.textData}</div>
        )}
      <div className="flex justify-end w-full">
        <StyledButton shape="freefloatcenter" onClick={closeHint}>
          <p className="text-sm">{translate("nextButton")}</p>
        </StyledButton>
      </div>
    </>
  );
}

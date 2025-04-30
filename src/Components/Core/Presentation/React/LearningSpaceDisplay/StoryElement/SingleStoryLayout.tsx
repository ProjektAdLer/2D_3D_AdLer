import { useTranslation } from "react-i18next";
import IStoryElementController from "./IStoryElementController";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { useEffect, useState } from "react";
import React from "react";
import CloseButton from "~ReactComponents/ReactRelated/ReactBaseComponents/CloseButton";
import closeIcon from "../../../../../../Assets/icons/close.svg";

export default function SingleStoryLayout({
  contentTexts,
  controller,
  withBackButton = false,
}: {
  contentTexts: string[];
  controller: IStoryElementController;
  withBackButton: boolean;
}) {
  const [pageId, setPageId] = useState(0);
  const { t: translate } = useTranslation("learningSpace");

  useEffect(() => {
    setPageId(0);
  }, [contentTexts]);

  return (
    <React.Fragment>
      {/* Story Text */}
      <div className="flex items-center p-2 bg-buttonbgblue rounded-xl whitespace-pre-line italic font-bold w-full text-justifiy ">
        {`"${contentTexts[pageId]}"`}{" "}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-row-reverse justify-between w-full min-h-8 lg:max-w-5xl xl:max-w-6xl">
        {withBackButton ? (
          <>
            <StyledButton
              shape="freeFloatLeft"
              onClick={() => controller.onBackToSelectionButtonClicked()}
              data-testid="back"
            >
              {"\u21A9"}
            </StyledButton>
          </>
        ) : (
          <div></div>
        )}

        {contentTexts.length > 1 && (
          <div className="grid w-16 grid-cols-2 gap-2 mx-1 lg:w-24 justify-items-end">
            <div>
              <StyledButton
                className="text-xl"
                shape="smallSquare"
                onClick={() => setPageId(Math.max(0, pageId - 1))}
                disabled={pageId <= 0}
                data-testid="back"
              >
                {"\u25B2"}
              </StyledButton>
            </div>

            <div className="col-start-2">
              <StyledButton
                className="text-xl"
                shape="smallSquare"
                onClick={() =>
                  setPageId(Math.min(contentTexts.length, pageId + 1))
                }
                disabled={pageId >= contentTexts.length - 1}
                data-testid="next"
              >
                {"\u25BC"}
              </StyledButton>
            </div>
          </div>
        )}
        <div></div>
      </div>
    </React.Fragment>
  );
}

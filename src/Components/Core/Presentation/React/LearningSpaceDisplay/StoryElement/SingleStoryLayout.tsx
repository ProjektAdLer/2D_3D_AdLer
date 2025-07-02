import IStoryElementController from "./IStoryElementController";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { useEffect, useState } from "react";
import React from "react";
import { useTranslation } from "react-i18next";

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

  useEffect(() => {
    setPageId(0);
  }, [contentTexts]);

  const { t: translate } = useTranslation("learningSpace");

  return (
    <React.Fragment>
      {/* Story Text */}
      <div className="flex items-center w-full p-2 italic font-bold whitespace-pre-line bg-buttonbgblue rounded-xl text-justifiy text-adlerdarkblue overflow-auto">
        {`"${contentTexts[pageId]}"`}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-row-reverse justify-between w-full min-h-8 lg:max-w-5xl xl:max-w-6xl">
        {withBackButton ? (
          <>
            <StyledButton
              shape="freeFloatLeft"
              onClick={() => controller.onBackToSelectionButtonClicked()}
              data-testid="back"
              title={translate("storySelectionToolTip").toString()}
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
                data-testid="prev-page" // Umbenannt, um Konflikt zu vermeiden
                title={translate("previousToolTip").toString()}
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
                title={translate("nextToolTip").toString()}
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

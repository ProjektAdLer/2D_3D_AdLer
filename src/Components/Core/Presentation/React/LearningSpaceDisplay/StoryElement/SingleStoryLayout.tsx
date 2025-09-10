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
      <div className="text-justifiy flex w-full items-center overflow-auto whitespace-pre-line rounded-xl bg-buttonbgblue p-2 font-bold italic text-adlerdarkblue">
        {`"${contentTexts[pageId]}"`}
      </div>

      {/* Navigation Buttons */}
      <div className="flex min-h-8 w-full flex-row-reverse justify-between lg:max-w-5xl xl:max-w-6xl">
        {withBackButton ? (
          <>
            <StyledButton
              shape="freeFloatLeft"
              onClick={() => controller.onBackToSelectionButtonClicked()}
              data-testid="story-back"
              title={translate("storySelectionToolTip").toString()}
            >
              {"\u21A9"}
            </StyledButton>
          </>
        ) : (
          <div></div>
        )}

        {contentTexts.length > 1 && (
          <div className="mx-1 grid w-16 grid-cols-2 justify-items-end gap-2 lg:w-24">
            <div>
              <StyledButton
                className="text-xl"
                shape="smallSquare"
                onClick={() => setPageId(Math.max(0, pageId - 1))}
                disabled={pageId <= 0}
                data-testid="story-prev-page"
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
                data-testid="story-next"
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

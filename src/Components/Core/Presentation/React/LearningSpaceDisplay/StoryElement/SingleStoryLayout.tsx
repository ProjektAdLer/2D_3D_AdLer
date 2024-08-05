import { useTranslation } from "react-i18next";
import IStoryElementController from "./IStoryElementController";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { useEffect, useState } from "react";
import React from "react";

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
      <div className="flex items-center justify-center p-2 bg-buttonbgblue rounded-xl">
        {contentTexts[pageId]}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full min-h-8 lg:max-w-5xl xl:max-w-6xl">
        {withBackButton && (
          <>
            <StyledButton
              shape="freefloatleft"
              onClick={() => controller.onBackToSelectionButtonClicked()}
            >
              {translate("backButton")}
            </StyledButton>
          </>
        )}

        <StyledButton onClick={() => controller.closePanel()}>
          {
            "ADD TRANSLATION HERE"
            //translate("closeButton")
          }
        </StyledButton>

        {contentTexts.length > 1 && (
          <div className="grid w-16 grid-cols-2 lg:w-32 justify-items-end">
            <div>
              <StyledButton
                shape="closeButton"
                onClick={() => setPageId(Math.max(0, pageId - 1))}
                disabled={pageId <= 0}
              >
                {"\u25C0"}
              </StyledButton>
            </div>

            <div className="col-start-2">
              <StyledButton
                shape="closeButton"
                onClick={() =>
                  setPageId(Math.min(contentTexts.length, pageId + 1))
                }
                disabled={pageId >= contentTexts.length - 1}
              >
                {"\u25B6"}
              </StyledButton>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

import React, { useEffect } from "react";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import StyledButton from "../ReactCommon/StyledButton";
import ILoadWorldController from "./ILoadWorldController";

export default function LoadWorldButton() {
  var controller: ILoadWorldController;

  useEffect(() => {
    controller = CoreDIContainer.get<ILoadWorldController>(
      CORE_TYPES.ILoadWorldController
    );
  }, []);

  return (
    <StyledButton
      onClick={() => {
        console.log("Load World plz");
        controller.loadWorld();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 lg:h10 lg:w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    </StyledButton>
  );
}

import IAvatarEditorController from "./IAvatarEditorController";
import AvatarEditorViewModel from "./AvatarEditorViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import React, { useState } from "react";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import AvatarEditorCategoryTabButton from "./AvatarEditorCategories/AvatarEditorCategoryTabButton";
import {
  AvatarEditorCategory,
  OAvatarEditorCategory,
} from "./AvatarEditorCategories/AvatarEditorCategories";
import AvatarEditorHairCategory from "./AvatarEditorCategories/AvatarEditorCategoryContents/AvatarEditorHairCategory";
import AvatarEditorFaceCategory from "./AvatarEditorCategories/AvatarEditorCategoryContents/AvatarEditorFaceCategory";
import AvatarEditorPreview from "./AvatarEditorPreview/AvatarEditorPreview";
import LoadingScreen from "~ReactComponents/GeneralComponents/LoadingScreen/LoadingScreen";

export default function AvatarEditor() {
  const [viewModel, controller] = useBuilder<
    AvatarEditorViewModel,
    IAvatarEditorController
  >(BUILDER_TYPES.IAvatarEditorBuilder);

  const [activeTab, setActiveTab] = useState<AvatarEditorCategory>(
    OAvatarEditorCategory.HAIR,
  );

  if (!viewModel || !controller) return null;

  return (
    <React.Fragment>
      <div className="flex flex-col h-[100svh] bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto overflow-hidden">
        <MenuHeaderBar
          location="editor"
          className="self-center w-full p-2 font-semibold"
        />
        <div className="grid grid-cols-2 grid-rows-1 portrait:grid-cols-1 portrait:grid-rows-2 grow lg:rounded-lg">
          {/* Categories (Left Side) */}

          <div className="flex flex-col portrait:order-2">
            {/* Category Tabs */}
            {/* Category Header */}
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-darkblue">
                  {activeTab === OAvatarEditorCategory.HAIR && "Haare"}
                  {activeTab === OAvatarEditorCategory.FACE && "Gesicht"}
                  {activeTab === OAvatarEditorCategory.ACCESSOIRE &&
                    "Accessoires"}
                  {activeTab === OAvatarEditorCategory.CLOTHING && "Kleidung"}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center p-2 space-x-4 ">
              {Object.values(OAvatarEditorCategory)
                .filter((category) => typeof category === "number")
                .map((category) => (
                  <AvatarEditorCategoryTabButton
                    key={category}
                    category={category as AvatarEditorCategory}
                    active={activeTab === category}
                    onClick={() => setActiveTab(category)}
                  />
                ))}
            </div>

            {/* Category Contents */}
            <div className="p-4 max-h-[77vh] portrait:max-h-[30vh] overflow-auto">
              {activeTab === OAvatarEditorCategory.HAIR && (
                <AvatarEditorHairCategory controller={controller} />
              )}
              {activeTab === OAvatarEditorCategory.FACE && (
                <AvatarEditorFaceCategory controller={controller} />
              )}
            </div>
          </div>

          {/* Avatar Preview (Right Side) */}
          <div className="p-4">
            <AvatarEditorPreview className="relative w-full h-full" />
          </div>
        </div>
        <LoadingScreen />
      </div>
    </React.Fragment>
  );
}

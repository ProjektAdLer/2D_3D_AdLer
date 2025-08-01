import IAvatarEditorController from "./IAvatarEditorController";
import AvatarEditorViewModel from "./AvatarEditorViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { useEffect, useState } from "react";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import AvatarEditorCategoryTabButton from "./AvatarEditorCategories/AvatarEditorCategoryTabButton";
import {
  AvatarEditorCategory,
  OAvatarEditorCategory,
} from "./AvatarEditorCategories/AvatarEditorCategories";
import AvatarEditorHairCategory from "./AvatarEditorCategories/AvatarEditorCategoryContents/AvatarEditorHairCategory";
import AvatarEditorAccessoireCategory from "./AvatarEditorCategories/AvatarEditorCategoryContents/AvatarEditorAccessoireCategory";
import AvatarEditorClothingCategory from "./AvatarEditorCategories/AvatarEditorCategoryContents/AvatarEditorClothingCategory";
import AvatarEditorPreview from "./AvatarEditorPreview/AvatarEditorPreview";
import AvatarEditorBodyCategory from "./AvatarEditorCategories/AvatarEditorCategoryContents/AvatarEditorBodyCategory";
import LoadingScreen from "~ReactComponents/GeneralComponents/LoadingScreen/LoadingScreen";
import LoadingScreenHomePageInformation from "~ReactComponents/GeneralComponents/LoadingScreen/LoadingScreenContent/LoadingScreenHomePageInformation";
import { useInjection } from "inversify-react";
import ILoadAvatarConfigUseCase from "../../Application/UseCases/LoadAvatarConfig/ILoadAvatarConfigUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import AvatarEditorFaceCategory from "./AvatarEditorCategories/AvatarEditorCategoryContents/AvatarEditorFaceCategory";
import AvatarEditorSaveButton from "./AvatarEditorSaveButton";
import AvatarEditorRandomizerButton from "./AvatarEditorRandomizerButton";
import { useTranslation } from "react-i18next";

export default function AvatarEditor() {
  const [viewModel, controller] = useBuilder<
    AvatarEditorViewModel,
    IAvatarEditorController
  >(BUILDER_TYPES.IAvatarEditorBuilder);

  const [activeTab, setActiveTab] = useState<AvatarEditorCategory>(
    OAvatarEditorCategory.HAIR,
  );
  const loadAvatarConfigUseCase = useInjection<ILoadAvatarConfigUseCase>(
    USECASE_TYPES.ILoadAvatarConfigUseCase,
  );

  const [categoryNameKeys] = useState<string[]>([
    "hair",
    "face",
    "accessoires",
    "clothing",
    "body",
  ]);

  const { t: translate } = useTranslation("avatarEditor");

  useEffect(() => {
    if (!controller) return;
    loadAvatarConfigUseCase.executeAsync();
  }, [controller, loadAvatarConfigUseCase]);

  if (!viewModel || !controller) return null;

  return (
    <div className="flex h-[100svh] flex-col overflow-hidden bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto text-adlerdarkblue">
      <MenuHeaderBar
        location="editor"
        className="w-full flex-shrink-0 self-center p-2 font-semibold"
        externContent={{
          contentLocation: "editor",
          content: (
            <AvatarEditorSaveButton
              controller={controller}
              viewModel={viewModel}
            />
          ),
        }}
      />
      <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-1 lg:rounded-lg portrait:grid-cols-1 portrait:grid-rows-[auto_1fr_auto]">
        {/* Categories (Left Side) */}
        <div className="flex min-h-0 flex-col portrait:order-2 portrait:row-start-2">
          {/* Category Header - Fixed */}
          <div className="flex flex-shrink-0 flex-row items-center justify-center p-2">
            <div className="flex flex-col items-center justify-center">
              <div className="text-base font-bold text-adlerdarkblue">
                {activeTab === OAvatarEditorCategory.HAIR && translate("hair")}
                {activeTab === OAvatarEditorCategory.FACE && translate("face")}
                {activeTab === OAvatarEditorCategory.ACCESSOIRE &&
                  translate("accessoires")}
                {activeTab === OAvatarEditorCategory.CLOTHING &&
                  translate("clothing")}
                {activeTab === OAvatarEditorCategory.BODY && translate("body")}
              </div>
            </div>
          </div>

          {/* Category Tabs - Fixed */}
          <div className="flex flex-shrink-0 flex-row justify-center space-x-4 p-2">
            {Object.values(OAvatarEditorCategory)
              .filter((category) => typeof category === "number")
              .map((category) => (
                <AvatarEditorCategoryTabButton
                  key={category}
                  category={category as AvatarEditorCategory}
                  active={activeTab === category}
                  onClick={() => setActiveTab(category)}
                  toolTip={translate("categoryToolTip", {
                    category: translate(categoryNameKeys[category]),
                  }).toString()}
                />
              ))}
            <AvatarEditorRandomizerButton
              controller={controller}
              viewModel={viewModel}
            />
          </div>

          {/* Category Contents - Scrollable */}
          <div className="min-h-0 flex-1 overflow-auto p-4">
            {activeTab === OAvatarEditorCategory.HAIR && (
              <AvatarEditorHairCategory
                controller={controller}
                viewModel={viewModel}
              />
            )}
            {activeTab === OAvatarEditorCategory.FACE && (
              <AvatarEditorFaceCategory
                controller={controller}
                viewModel={viewModel}
              />
            )}
            {activeTab === OAvatarEditorCategory.ACCESSOIRE && (
              <AvatarEditorAccessoireCategory
                controller={controller}
                viewModel={viewModel}
              />
            )}
            {activeTab === OAvatarEditorCategory.CLOTHING && (
              <AvatarEditorClothingCategory
                controller={controller}
                viewModel={viewModel}
              />
            )}
            {activeTab === OAvatarEditorCategory.BODY && (
              <AvatarEditorBodyCategory
                controller={controller}
                viewModel={viewModel}
              />
            )}
          </div>
        </div>

        {/* Avatar Preview (Right Side) - Fixed, no scroll */}
        <div className="flex min-h-0 items-center justify-center overflow-hidden p-4 portrait:order-1 portrait:row-start-1 portrait:h-[40vh]">
          <AvatarEditorPreview className="relative z-10 h-full max-h-full w-full" />
        </div>
      </div>

      <LoadingScreen
        content={<LoadingScreenHomePageInformation />}
        i18nKeys={{
          namespace: "avatarEditor",
          button: "enterAvatarEditor",
          onLoading: "loadAvatarEditor",
          onLoadingFinished: "finishedAvatarEditor",
        }}
        autoClose={true}
      />
    </div>
  );
}

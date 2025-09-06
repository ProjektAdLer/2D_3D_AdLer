import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BadgeOverviewModalViewModel from "./BadgeOverviewModalViewModel";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { useTranslation } from "react-i18next";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import { ThemeType } from "src/Components/Core/Domain/Types/ThemeTypes";
import {
  badgePicturesAB,
  badgePicturesCompany,
  badgePicturesKE,
  badgePicturesSuburb,
} from ".././LevelUpModal/BadgePictureLookup";

export default function BadgeOverviewModal({ className }: AdLerUIComponent) {
  const [viewModel] = useBuilder<BadgeOverviewModalViewModel, undefined>(
    BUILDER_TYPES.IBadgeOverviewModalBuilder,
  );
  const [isOpen] = useObservable(viewModel?.isOpen);

  const { t: translate } = useTranslation("learningSpace");
  if (!viewModel) return null;

  let badgePictures: string[] = [];
  let badgePictureArray = [];
  switch (viewModel.worldTheme) {
    case ThemeType.CampusAB:
      badgePictureArray = Object.values(badgePicturesAB);
      badgePictures = badgePictureArray.slice(0, viewModel.currentLevel.Value);
      break;
    case ThemeType.CampusKE:
      badgePictureArray = Object.values(badgePicturesKE);
      badgePictures = badgePictureArray.slice(0, viewModel.currentLevel.Value);
      break;
    case ThemeType.Suburb:
      badgePictureArray = Object.values(badgePicturesSuburb);
      badgePictures = badgePictureArray.slice(0, viewModel.currentLevel.Value);
      break;
    case ThemeType.Company:
      badgePictureArray = Object.values(badgePicturesCompany);
      badgePictures = badgePictureArray.slice(0, viewModel.currentLevel.Value);
      break;
    default:
      badgePictureArray = Object.values(badgePicturesKE);
      badgePictures = badgePictureArray.slice(0, viewModel.currentLevel.Value);
  }
  return (
    <StyledModal
      className={tailwindMerge(
        className,
        "flex flex-col items-center justify-center",
      )}
      title={translate("badgeOverviewTitle").toString()}
      showModal={isOpen}
      onClose={() => {
        viewModel.isOpen.Value = false;
      }}
    >
      <div className="grid grid-cols-2 justify-items-stretch gap-4 p-4">
        {badgePictures.map((badge, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <img
              src={badge}
              alt={index.toString()}
              className="h-16 w-16 object-contain"
            />
          </div>
        ))}
      </div>
    </StyledModal>
  );
}

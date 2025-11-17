import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import LearningElementModalViewModel from "../LearningElementModalViewModel";
import YoutubeVideoHost from "./VideoHosters/YoutubeVideoHost";
import OpencastVideoHost from "./VideoHosters/OpencastVideoHost";
import VimeoVideoHost from "./VideoHosters/VimeoVideoHost";
import CookieConsentBlocker from "./CookieConsentBlocker";
import ILearningElementModalController from "../ILearningElementModalController";

export default function VideoComponent({
  viewModel,
  controller,
}: {
  viewModel: LearningElementModalViewModel;
  controller: ILearningElementModalController;
}) {
  const [filepath] = useObservable(viewModel.filePath);
  const [cookieConsent] = useObservable(viewModel.cookieConsent);

  if (!filepath) return null;

  const hasConsent = cookieConsent === "accepted";

  if (!hasConsent) {
    return <CookieConsentBlocker controller={controller} />;
  }

  const videoComponent = getVideoComponent(filepath); // Set the video component using regex

  return (
    <div className="items-top flex h-[80vh] w-[85vw] justify-center sm:h-[70vh] lg:h-[75vh] xl:h-[80vh]">
      {videoComponent}
    </div>
  );
}

function getVideoComponent(filepath: string) {
  const youtubeRegex = /youtu/;
  const opencastRegex = /paella/;
  const vimeoRegex = /vimeo/;

  if (youtubeRegex.test(filepath)) {
    return <YoutubeVideoHost url={filepath} />;
  } else if (opencastRegex.test(filepath)) {
    return <OpencastVideoHost url={filepath} />;
  } else if (vimeoRegex.test(filepath)) {
    return <VimeoVideoHost url={filepath} />;
  } else {
    return "No Video Component found for given URL" + filepath;
  }
}

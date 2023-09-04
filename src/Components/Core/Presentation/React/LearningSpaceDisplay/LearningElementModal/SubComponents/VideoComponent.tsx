import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import LearningElementModalViewModel from "../LearningElementModalViewModel";
import YoutubeVideoHost from "./VideoHosters/YoutubeVideoHost";
import OpencastVideoHost from "./VideoHosters/OpencastVideoHost";
import VimeoVideoHost from "./VideoHosters/VimeoVideoHost";

export default function VideoComponent({
  viewModel,
}: {
  viewModel: LearningElementModalViewModel;
}) {
  const [filepath] = useObservable(viewModel.filePath);

  if (!filepath) return null;

  const videoComponent = getVideoComponent(filepath); // Set the video component using regex

  return (
    <div className="flex justify-center items-top h-[85vh] w-[85vw] ">
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

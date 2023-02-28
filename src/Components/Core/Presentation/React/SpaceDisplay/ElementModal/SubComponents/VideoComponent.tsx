import axios from "axios";
import { useEffect, useState } from "react";
import { logger } from "src/Lib/Logger";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import ElementModalViewModel from "../ElementModalViewModel";

export default function VideoComponent({
  viewModel,
}: {
  viewModel: ElementModalViewModel;
}) {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("VideoTitle");
  const [filepath] = useObservable(viewModel.filePath);

  /*
  This is the not-hacky way to get the video url, but it requires a fetch request to youtube's oembed api.
  This ensures that for all possible youtube urls, the embed link and a timestamp can be extracted.
  
  Additionally, the title of the video is also extracted from the oembed api.
  */

  useEffect(() => {
    async function getVideoUrl() {
      const response = await axios.get<{ html: string; title: string }>(
        `https://www.youtube.com/oembed?url=${filepath}`
      );

      const regex = /src="([^"]*)"/;
      const srcArray = regex.exec(response.data.html);

      if (srcArray?.length === 2) {
        setVideoUrl(srcArray[1]);
        setVideoTitle(response.data.title);
      } else {
        logger.error("Could not extract video url from youtube oembed api");
        setVideoTitle("Could not extract video url from youtube oembed api");
        setVideoUrl("");
      }
    }

    // TODO: Run this only if the viewmodel has a value
    getVideoUrl();
  }, [filepath]);

  return (
    <div className="flex justify-center items-top max-h-90pro sm:w-[300px] md:w-[315px] lg:w-[900px]">
      <iframe
        className="w-full rounded-lg aspect-video"
        src={videoUrl}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={videoTitle}
      />
    </div>
  );
}

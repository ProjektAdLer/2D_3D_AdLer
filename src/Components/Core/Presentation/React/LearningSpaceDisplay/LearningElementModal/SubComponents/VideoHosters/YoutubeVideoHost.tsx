import axios from "axios";
import { useEffect, useState } from "react";
import ILoggerPort from "src/Components/Core/Application/Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";

/*
  This is the not-hacky way to get the video url, but it requires a fetch request to youtube's oembed api.
  This ensures that for all possible youtube urls, the embed link and a timestamp can be extracted.
  
  Additionally, the title of the video is also extracted from the oembed api.
  */

export default function YoutubeVideoHost({ url }: { url: string }) {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("VideoTitle");
  const logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);

  useEffect(() => {
    async function getYoutubeVideoUrl() {
      const response = await axios.get<{ html: string; title: string }>(
        `https://www.youtube.com/oembed?url=${url}`
      );

      const regex = /src="([^"]*)"/;
      const srcArray = regex.exec(response.data.html);

      if (srcArray?.length === 2) {
        setVideoUrl(srcArray[1]);
        setVideoTitle(response.data.title);
      } else {
        logger.log(
          LogLevelTypes.ERROR,
          "Could not extract video url from youtube oembed api"
        );
        setVideoTitle("Could not extract video url from youtube oembed api");
        setVideoUrl("");
      }
    }

    getYoutubeVideoUrl();
  }, [url]);

  if (!videoUrl) return null;

  return (
    <iframe
      className="w-full rounded-lg aspect-video"
      src={videoUrl}
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={videoTitle}
    />
  );
}

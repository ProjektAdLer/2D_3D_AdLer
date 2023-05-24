import axios from "axios";
import { useEffect, useState } from "react";
import { logger } from "src/Lib/Logger";

export default function YoutubeVideoHost({ url }: { url: string }) {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("VideoTitle");

  useEffect(() => {
    async function getVimeoVideoUrl() {
      const response = await axios.get<{ html: string; title: string }>(
        `https://vimeo.com/api/oembed.json?url=${url}`
      );

      const regex = /src="([^"]*)"/;
      const srcArray = regex.exec(response.data.html);

      if (srcArray?.length === 2) {
        setVideoUrl(srcArray[1]);
        setVideoTitle(response.data.title);
      } else {
        logger.error("Could not extract video url from vimeo oembed api");
        setVideoTitle("Could not extract video url from vimeo oembed api");
        setVideoUrl("");
      }
    }

    getVimeoVideoUrl();
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

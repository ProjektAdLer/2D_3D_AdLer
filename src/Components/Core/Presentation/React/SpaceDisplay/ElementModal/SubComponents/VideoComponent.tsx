import { useEffect, useState } from "react";
import ElementModalViewModel from "../ElementModalViewModel";

export default function VideoComponent({
  viewModel,
}: {
  viewModel: ElementModalViewModel;
}) {
  const [videoUrl, setvideoUrl] = useState("second");

  useEffect(() => {
    const regex =
      /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;
    const videoId = viewModel.filePath.Value.match(regex);
    const test = videoId![0];

    setvideoUrl(test.split("/")[1].split("=")[1]);
  }, []);

  return (
    <div className="flex justify-center items-top max-h-90pro sm:w-[300px] md:w-[315px] lg:w-[900px]">
      <iframe
        className="w-full rounded-lg aspect-video"
        src={`https://www.youtube.com/embed/${videoUrl}`}
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

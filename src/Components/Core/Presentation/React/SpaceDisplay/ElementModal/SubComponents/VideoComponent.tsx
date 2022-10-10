import { useInjection } from "inversify-react";
import React, { useEffect, useState } from "react";
import IGetElementSourceUseCase from "src/Components/Core/Application/UseCases/GetElementSourceUseCase/IGetElementSourceUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import ElementModalViewModel from "../ElementModalViewModel";

const VideoComponent = ({
  viewModel,
}: {
  viewModel: ElementModalViewModel;
}) => {
  const [videoUrl, setvideoUrl] = useState("second");

  const getElementSourceUseCase = useInjection<IGetElementSourceUseCase>(
    USECASE_TYPES.IGetElementSource
  );

  useEffect(() => {
    const debug = async () => {
      const path = await getElementSourceUseCase.executeAsync({
        courseId: viewModel.parentCourseId.Value,
        elementId: viewModel.id.Value,
      });

      const regex =
        /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;
      const videoId = path.match(regex);
      const test = videoId![0];

      setvideoUrl(test.split("/")[1]);
    };
    debug();
  }, []);

  return (
    <div className="flex justify-center items-top max-h-90pro sm:w-[300px] md:w-[315px] lg:w-[900px]">
      <iframe
        className="w-full rounded-lg aspect-video"
        src={`https://www.youtube.com/embed/${"UEJpDrXuP98"}`}
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};
export default VideoComponent;

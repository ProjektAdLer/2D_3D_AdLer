import React from "react";

const VideoComponent = (props: { embedId: string }) => (
  <div className="flex justify-center items-top max-h-90pro sm:w-[300px] md:w-[315px] lg:w-[700px] xl:w-[900px] 2xl:w-[1100px]">
    <iframe
      className="rounded-lg aspect-video w-full"
      src={`https://www.youtube.com/embed/${props.embedId}`}
      frameBorder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);
export default VideoComponent;

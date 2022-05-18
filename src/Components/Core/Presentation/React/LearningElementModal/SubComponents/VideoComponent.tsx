import React from "react";

const VideoComponent = (props: { embedId: string }) => (
  <div className="flex-0 w-3/5 aspect-video ">
    <iframe
      className="rounded-lg  w-full h-full"
      src={`https://www.youtube.com/embed/${props.embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);
export default VideoComponent;

import React from "react";

const VideoComponent = (props: { embedId: string }) => (
  <div className="lg:w-full w-5/6 aspect-video">
    <iframe
      src={`https://www.youtube.com/embed/${props.embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);
export default VideoComponent;

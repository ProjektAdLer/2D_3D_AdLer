import React from "react";

const VideoComponent = (props: { embedId: string }) => (
  <div className="flex justify-center items-top w-full lg:w-screen h-fit">
    <iframe
      className="rounded-lg h90vh"
      src={`https://www.youtube.com/embed/${props.embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
      style={{ width: "95%" }}
    />
  </div>
);
export default VideoComponent;

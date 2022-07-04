import { useEffect, useRef } from "react";

import { H5P } from "h5p-standalone";
export default function NewH5PContent(props: { h5pEntityId: string }) {
  const iframeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const debug = async () => {
      if (iframeRef.current) {
        const el = iframeRef.current;
        const options = {
          h5pJsonPath: "https://localhost:7117/h5p/",
          frameJs: "../../ThirdParty/assets/frame.bundle.js",
          frameCss: "../../ThirdParty/styles/h5p.css",
        };
        await new H5P(el, options);
      }
    };
    debug();
  }, []);

  return (
    <div className="App">
      <div
        id="h5p-container"
        style={{
          width: "800px",
        }}
        ref={iframeRef}
      ></div>
    </div>
  );
}

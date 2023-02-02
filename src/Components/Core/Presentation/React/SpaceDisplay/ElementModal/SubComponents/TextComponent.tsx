import { useState, useEffect } from "react";
import ElementModalViewModel from "../ElementModalViewModel";

export default function TextComponent({
  viewModel,
}: {
  viewModel: ElementModalViewModel;
}) {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(viewModel.filePath.Value).then((response) =>
      response.text().then((text) => setText(text))
    );
  }, []);

  return (
    <div className="flex justify-center max-h-[75vh] lg:max-h-[85vh] xl:max-h-[85vh] w-fit h-fit max-w-[99vw] font-medium text-black">
      <p className="w-[80vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] 2xl:[30vw] p-8 bg-white rounded-lg overflow-auto">
        {text}
      </p>
    </div>
  );
}

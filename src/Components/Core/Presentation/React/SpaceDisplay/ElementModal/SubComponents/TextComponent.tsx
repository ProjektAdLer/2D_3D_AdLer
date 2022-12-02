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
    <div className="w-[400px] lg:w-[800px] h-[80vh] text-black font-medium overflow-auto bg-adlerblue-100 p-3">
      <p>{text}</p>
    </div>
  );
}

import { useInjection } from "inversify-react";
import { useState, useEffect } from "react";
import IGetElementSourceUseCase from "src/Components/Core/Application/UseCases/GetElementSourceUseCase/IGetElementSourceUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import ElementModalViewModel from "../ElementModalViewModel";

const showFile = async (path: string): Promise<string> => {
  const text = await fetch(path);
  return text.text();
};

export default function TextComponent({
  viewModel,
}: {
  viewModel: ElementModalViewModel;
}) {
  const [text, setText] = useState("");

  const getElementSourceUseCase = useInjection<IGetElementSourceUseCase>(
    USECASE_TYPES.IGetElementSource
  );

  useEffect(() => {
    const debug = async () => {
      const path = await getElementSourceUseCase.executeAsync({
        courseId: viewModel.parentCourseId.Value,
        elementId: viewModel.id.Value,
      });

      setText(await showFile(path));
    };
    debug();
  }, []);
  return (
    <div className="w-[400px] lg:w-[800px] h-[80vh] text-black font-medium overflow-auto bg-adlerblue-100 p-3">
      <p>{text}</p>
    </div>
  );
}

import { useEffect, useState } from "react";
import Observable from "src/Lib/Observable";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import tailwindMerge from "../../../Utils/TailwindMerge";

export interface AccordionProps {
  isOpen: Observable<boolean>;
  content: JSX.Element;
  header?: string;
  className?: string;
  buttonClassName?: string;
  headerClassName?: string;
  toolTip?: string;
}

export default function AccordionElement(props: AccordionProps) {
  const [isOpen, setIsOpen] = useObservable<boolean>(props.isOpen);
  const [arrowSymbol, setArrowSymbol] = useState<string>(
    props.isOpen.Value ? "\u25BC" : "\u25B6",
  );

  // content as useState prevents occassional pop-in of thumbnails ~sb
  const [content, setContent] = useState<JSX.Element | null>(
    props.isOpen.Value ? props.content : null,
  );
  const [cssEffect, setCssEffect] = useState<string>("");

  useEffect(() => {
    isOpen ? setArrowSymbol("\u25BC") : setArrowSymbol("\u25B6");
    isOpen ? setContent(props.content) : setContent(null);
    // prevents repeated opening-animation on already open accordion elements on category switch ~sb
    if (isOpen === props.isOpen.Value) {
      setCssEffect(isOpen ? "accordionOpening" : "accordionCollapsing");
    } else {
      setCssEffect("");
    }
  }, [isOpen, props]);

  return (
    <>
      <div
        className={tailwindMerge(
          "pb-2 border-b border-gray-500",
          props.className ?? "",
        )}
      >
        <button
          className={tailwindMerge(
            "content-start w-full text-left",
            props.buttonClassName ?? "",
          )}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          title={props.toolTip}
        >
          <h1
            className={tailwindMerge(
              "text-2xl portrait:text-lg font-bold",
              props.headerClassName ?? "",
            )}
          >
            {arrowSymbol + " " + props.header}
          </h1>
        </button>
      </div>
      <div>
        <div className={cssEffect}>{content}</div>
      </div>
    </>
  );
}

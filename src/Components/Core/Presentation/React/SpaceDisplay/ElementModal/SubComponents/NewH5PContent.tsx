import { useEffect, useRef, useState } from "react";
import { H5P as H5PPlayer } from "h5p-standalone";
import ElementModalViewModel from "../ElementModalViewModel";
import { config } from "../../../../../../../config";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IScoreH5PElement from "src/Components/Core/Application/UseCases/ScoreH5PElement/IScoreH5PElement";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { useInjection } from "inversify-react";
import IGetElementSourceUseCase from "src/Components/Core/Application/UseCases/GetElementSourceUseCase/IGetElementSourceUseCase";

//TODOPG: This need to be stripped into a Controller. Until then, this code is ugly

export const h5pEventCalled = (
  event: any,
  viewModel: ElementModalViewModel
) => {
  // Skip malformed events.
  let hasStatement = event && event.data && event.data.statement;
  if (!hasStatement) {
    return;
  }

  let statement = event.data.statement;
  let validVerb = statement.verb && statement.verb.id;
  if (!validVerb) {
    return;
  }

  let isCompleted =
    statement.verb.id === "http://adlnet.gov/expapi/verbs/answered" ||
    statement.verb.id === "http://adlnet.gov/expapi/verbs/completed";

  let isChild =
    statement.context &&
    statement.context.contextActivities &&
    statement.context.contextActivities.parent &&
    statement.context.contextActivities.parent[0] &&
    statement.context.contextActivities.parent[0].id;

  if (isCompleted && !isChild) {
    const xapiData = event.data.statement as XAPIData;

    statement.result.success = statement?.result?.score?.scaled == 1 || false;

    CoreDIContainer.get<IScoreH5PElement>(
      USECASE_TYPES.IScoreH5PElement
    ).executeAsync({
      //@ts-ignore
      xapiData: xapiData,
      elementId: viewModel.id.Value,
      courseId: viewModel.parentCourseId.Value,
    });
  }
};

export default function NewH5PContent({
  viewModel,
}: {
  viewModel: ElementModalViewModel;
}) {
  const h5pContainerRef = useRef<HTMLDivElement>(null);

  const getElementSourceUseCase = useInjection<IGetElementSourceUseCase>(
    USECASE_TYPES.IGetElementSource
  );

  useEffect(() => {
    const debug = async () => {
      if (h5pContainerRef.current) {
        const el = h5pContainerRef.current;

        let baseURL = config.serverURL.replace(/api\/?$/, "");

        const filePath = await getElementSourceUseCase.executeAsync({
          courseId: viewModel.parentCourseId.Value,
          elementId: viewModel.id.Value,
        });

        let h5pJsonURL =
          baseURL + filePath.replaceAll("\\", "/").replaceAll("wwwroot/", "");

        const options = {
          h5pJsonPath: h5pJsonURL,
          frameJs:
            window.location.protocol +
            "//" +
            window.location.host +
            "/h5pBase/frame.bundle.js",
          frameCss:
            window.location.protocol +
            "//" +
            window.location.host +
            "/h5pBase/styles/h5p.css",
        };

        await new H5PPlayer(el, options);

        /* istanbul ignore next */
        //@ts-ignore
        H5P.externalDispatcher.on("xAPI", (event: any) => {
          /* istanbul ignore next */
          h5pEventCalled(event, viewModel);
        });
        //@ts-ignore
        H5P.xAPICompletedListener = function (t) {
          if (
            ("completed" === t.getVerb() || "answered" === t.getVerb()) &&
            !t.getVerifiedStatementValue([
              "context",
              "contextActivities",
              "parent",
            ])
          ) {
            var n = t.getScore(),
              r = t.getMaxScore(),
              i = t.getVerifiedStatementValue([
                "object",
                "definition",
                "extensions",
                "http://h5p.org/x-api/h5p-local-content-id",
              ]);
            //@ts-ignore
            e.setFinished(i, n, r);
          }
        };
      }
    };
    debug();

    return () => {
      // Remove event listener
      //@ts-ignore
      H5P.externalDispatcher.off("xAPI");
      //@ts-ignore
      H5PIntegration.contents = {};
    };
  }, []);

  return (
    <div className="App">
      <div
        className="h-[80vh] lg:w-[800px] lg:h-[600px] aspect-video"
        id="h5p-container"
        ref={h5pContainerRef}
      ></div>
    </div>
  );
}

export interface Account {
  name: string;
  homePage: string;
}

export interface Actor {
  name: string;
  objectType: string;
  account: Account;
}

export interface Display {
  "en-US": string;
}

export interface Verb {
  id: string;
  display: Display;
}

export interface Name {
  "en-US": string;
}

export interface Description {
  "en-US": string;
}

export interface Description2 {
  "en-US": string;
}

export interface Source {
  id: string;
  description: Description2;
}

export interface Description3 {
  "en-US": string;
}

export interface Target {
  id: string;
  description: Description3;
}

export interface Definition {
  name: Name;
  description: Description;
  type: string;
  interactionType: string;
  source: Source[];
  correctResponsesPattern: string[];
  target: Target[];
}

export interface Object {
  id: string;
  objectType: string;
  definition: Definition;
}

export interface Parent {
  id: string;
  objectType: string;
}

export interface Category {
  id: string;
  objectType: string;
}

export interface ContextActivities {
  parent: Parent[];
  category: Category[];
}

export interface Context {
  contextActivities: ContextActivities;
}

export interface Score {
  min: number;
  max: number;
  raw: number;
  scaled: number;
}

export interface Result {
  score: Score;
  completion: boolean;
  success: boolean;
  duration: string;
  response: string;
}

export interface XAPIData {
  actor: Actor;
  verb: Verb;
  object: Object;
  context: Context;
  result: Result;
}

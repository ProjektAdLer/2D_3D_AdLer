import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";

export default interface IScoreH5PElement
  extends IAsyncUsecase<
    {
      xapiData: XAPIEvent;
      elementID: ComponentID;
    },
    boolean
  > {}

export type XAPIEvent = {
  actor: {
    account?: {
      name: string;
    };
    objectType: string;
    name: string;
    mbox: string;
  };
  verb: {
    id: string;
    display: {
      "en-US": string;
    };
  };
  object: {
    id: string;
    objectType: string;
    definition: {
      extensions: {
        "http://h5p.org/x-api/h5p-local-content-id": string;
      };
      name: {
        "en-US": string;
      };
    };
  };
  context: {
    contextActivities: {
      category: Array<{
        id: string;
        objectType: string;
      }>;
    };
  };
  result?: {
    success?: boolean;
    completion?: boolean;
    score?: {
      scaled?: number;
      raw?: number;
      min?: number;
      max?: number;
    };
  };
};

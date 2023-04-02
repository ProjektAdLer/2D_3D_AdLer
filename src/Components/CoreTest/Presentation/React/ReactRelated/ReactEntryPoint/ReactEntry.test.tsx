import { mock } from "jest-mock-extended";
import BUILDER_TYPES from "../../../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import IPresentationDirector from "../../../../../Core/Presentation/PresentationBuilder/IPresentationDirector";
import React from "react";

import ReactEntry from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/ReactEntry";

const directorMock = mock<IPresentationDirector>();

jest.mock(
  "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/App",
  () => () => <div>App</div>
);

describe("ReactEntry", () => {
  let systemUnderTest: ReactEntry;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IPresentationDirector>(
      BUILDER_TYPES.IPresentationDirector
    ).toConstantValue(directorMock);
  });

  beforeEach(() => {
    systemUnderTest = new ReactEntry();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("setupReact", () => {
    // disable console.error
    const originalError = console.error;
    console.error = jest.fn();

    const container = document.createElement("div");
    container.setAttribute("id", "root");
    document.body.appendChild(container);
    systemUnderTest.setupReact();
    // restore console.error
    console.error = originalError;
  });
});

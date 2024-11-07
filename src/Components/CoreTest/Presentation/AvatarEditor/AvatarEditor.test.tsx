import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import AvatarEditor from "../../../Core/Presentation/AvatarEditor/AvatarEditor";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import { OAvatarEditorCategory } from "../../../Core/Presentation/AvatarEditor/AvatarEditorCategories/AvatarEditorCategories";
import useBuilderMock from "../React/ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import AvatarEditorViewModel from "../../../Core/Presentation/AvatarEditor/AvatarEditorViewModel";
import IAvatarEditorController from "../../../Core/Presentation/AvatarEditor/IAvatarEditorController";
import mock from "jest-mock-extended/lib/Mock";

jest.mock(
  "../../../Core/Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreview",
  () => "MockedAvatarEditorPreview",
);

describe("AvatarEditor", () => {
  test("should renders", () => {
    useBuilderMock([
      new AvatarEditorViewModel(),
      mock<IAvatarEditorController>(),
    ]);

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <AvatarEditor />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  test("doesn't render without viewModel or controller", () => {
    useBuilderMock([undefined, undefined]);

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <AvatarEditor />
      </Provider>,
    );

    expect(container).toBeEmptyDOMElement();
  });

  test.each([[OAvatarEditorCategory.HAIR], [OAvatarEditorCategory.FACE]])(
    "should render %s category when tab button is clicked",
    (category) => {
      useBuilderMock([
        new AvatarEditorViewModel(),
        mock<IAvatarEditorController>(),
      ]);

      const result = render(
        <Provider container={CoreDIContainer}>
          <AvatarEditor />
        </Provider>,
      );

      const tabButton = result.getByTestId(
        `avatar-editor-category-tab-${category}`,
      );

      act(() => {
        fireEvent.click(tabButton);
      });

      expect(result.container).toMatchSnapshot();
    },
  );
});

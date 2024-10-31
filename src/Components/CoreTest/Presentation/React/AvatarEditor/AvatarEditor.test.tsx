import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import AvatarEditor from "../../../../../Components/Core/Presentation/React/AvatarEditor/AvatarEditor";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import { OAvatarEditorCategory } from "../../../../Core/Presentation/React/AvatarEditor/AvatarEditorCategories";

describe("AvatarEditor", () => {
  test("should renders", () => {
    const { container } = render(
      <Provider container={CoreDIContainer}>
        <AvatarEditor />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  test.each([[OAvatarEditorCategory.HAIR], [OAvatarEditorCategory.FACE]])(
    "should render %s category when tab button is clicked",
    (category) => {
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

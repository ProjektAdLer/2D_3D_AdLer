import { fireEvent, render, waitFor } from "@testing-library/react";
import AccordionElement from "../../../../../Core/Presentation/React/GeneralComponents/Accordion/AccordionElement";
import React from "react";
import Observable from "../../../../../../Lib/Observable";

describe("AccordionElement", () => {
  test("should render", () => {
    const container = render(
      <AccordionElement
        isOpen={new Observable<boolean>(true)}
        content={<></>}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("content renders when isopen is true", () => {
    const container = render(
      <AccordionElement
        isOpen={new Observable<boolean>(true)}
        content={<div>test</div>}
      />,
    );
    waitFor(() => {
      expect(container.queryAllByDisplayValue("test").length).toBe(1);
    });
  });

  test("content wont render when isopen is false", () => {
    const container = render(
      <AccordionElement
        isOpen={new Observable<boolean>(false)}
        content={<div>test</div>}
      />,
    );
    waitFor(() => {
      expect(container.queryAllByDisplayValue("test").length).toBe(0);
    });
  });

  test("clicking on button opens/closes content", () => {
    const container = render(
      <AccordionElement
        isOpen={new Observable<boolean>(false)}
        content={<div>test</div>}
      />,
    );

    container.queryByRole("button")?.click();

    waitFor(() => {
      expect(container.queryAllByDisplayValue("test").length).toBe(1);
    });
  });
});

import * as useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";

/**
 * Mocks the useViewModelControllerProvider hook.
 * @param mockedTupels The return value, which the mocked hook will return.
 *
 */
export default function useBuilderMock(
  mockedTupels: [viewModel: any, controller: any] = [undefined, undefined]
) {
  jest.spyOn(useBuilder, "default").mockReturnValue(mockedTupels);
}

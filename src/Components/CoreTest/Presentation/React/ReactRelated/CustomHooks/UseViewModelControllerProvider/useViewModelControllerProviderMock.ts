import * as useViewModelControllerProvider from "../../../../../../Core/Presentation/React/ReactRelated/CustomHooks/useViewModelControllerProvider";

/**
 * Mocks the useViewModelControllerProvider hook.
 * @param mockedTupels The return value, which the mocked hook will return.
 *
 */
export default function useViewModelControllerProviderMock<VM, C>(
  mockedTupels: [VM[], C[]] = [[], []]
) {
  jest
    .spyOn(useViewModelControllerProvider, "default")
    .mockReturnValue(mockedTupels);
}

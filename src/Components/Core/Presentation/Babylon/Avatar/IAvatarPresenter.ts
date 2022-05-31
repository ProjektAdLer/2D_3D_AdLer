import AvatarViewModel from "./AvatarViewModel";

export default interface IAvatarPresenter {
  set ViewModel(newViewModel: AvatarViewModel);
}

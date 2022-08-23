import ImageComponent from "./SubComponents/ImageComponent";
import VideoComponent from "./SubComponents/VideoComponent";
import TextComponent from "./SubComponents/TextComponent";
import LearningElementModalViewModel from "./LearningElementModalViewModel";
import StyledModal from "../ReactBaseComponents/StyledModal";
import useObservable from "../CustomHooks/useObservable";
import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import LearningElementModalController from "./LearningElementModalController";
import NewH5PContent from "./SubComponents/NewH5PContent";

const elementBuilder = (modalViewModel: LearningElementModalViewModel<any>) => {
  const loremText =
    "Godfather ipsum dolor sit amet. In Sicily, women are more dangerous than shotguns. Leave the gun. Take the cannoli. I'm your older brother, Mike, and I was stepped over! I'm gonna make him an offer he can't refuse. That's my family Kay, that's not me. Don't ever give an order like that again. Not while I'm alive. Vito, how do you like my little angel? Isn't she beautiful? Don't you know that I would use all of my power to prevent something like that from happening? This one time, this one time I'll let you ask me about my affairs. Hey, listen, I want somebody good - and I mean very good - to plant that gun. I don't want my brother coming out of that toilet with just his dick in his hands, alright? Don Corleone, I am honored and grateful that you have invited me to your home on the wedding day of your daughter. And may their first child be a masculine child. Is that why you slapped my brother around in public? Why did you go to the police? Why didn't you come to me first? What's the matter with you, huh? What am I going to do? Am I going to make that baby an orphan before he's born? I am sorry. What happened to your father was business. I have much respect for your father. But your father, his thinking is old-fashioned. You must understand why I had to do that. Now let's work through where we go from here. I don't trust a doctor who can hardly speak English. Mr Corleone is Johnny Fontane's godfather. Now Italians regard that as a very close, a very sacred religious relationship. I want your answer and the money by noon tomorrow. And one more thing. Don't you contact me again, ever. From now on, you deal with Turnbull. Sonny, please don't do anything. Please don't do anything. Do me this favor. I won't forget it. Ask your friends in the neighborhood about me. They'll tell you I know how to return a favor. It's not personal. It's business. My father taught me many things here - he taught me in this room. He taught me: keep your friends close, but your enemies closer. Why do you hurt me, Michael? I've always been loyal to you. It's a Sicilian message. It means Luca Brasi sleeps with the fishes. I don't like violence, Tom. I'm a businessman; blood is a big expense. Just when I thought I was out... they pull me back in. My father's name was Antonio Andolini... and this is for you. It's an old habit. I spent my whole life trying not to be careless. Women and children can afford to be careless, but not men. You can act like a man! The hotel, the casino. The Corleone Family wants to buy you out. Never hate your enemies. It affects your judgment. If anything in this life is certain, if history has taught us anything, it is that you can kill anyone. Your enemies always get strong on what you leave behind. Te salut, Don Corleone. Vito, how do you like my little angel? Isn't she beautiful? Don't you know that I would use all of my power to prevent something like that from happening? This one time, this one time I'll let you ask me about my affairs. Hey, listen, I want somebody good - and I mean very good - to plant that gun. I don't want my brother coming out of that toilet with just his dick in his hands, alright? Don Corleone, I am honored and grateful that you have invited me to your home on the wedding day of your daughter. And may their first child be a masculine child. Is that why you slapped my brother around in public? Why did you go to the police? Why didn't you come to me first? What's the matter with you, huh? What am I going to do? Am I going to make that baby an orphan before he's born? I am sorry. What happened to your father was business. I have much respect for your father. But your father, his thinking is old-fashioned. You must understand why I had to do that. Now let's work through where we go from here. I don't trust a doctor who can hardly speak English. Mr Corleone is Johnny Fontane's godfather. Now Italians regard that as a very close, a very sacred religious relationship. I want your answer and the money by noon tomorrow. And one more thing. Don't you contact me again, ever. From now on, you deal with Turnbull. Sonny, please don't do anything. Please don't do anything. Do me this favor. I won't forget it. Ask your friends in the neighborhood about me. They'll tell you I know how to return a favor. It's not personal. It's business. My father taught me many things here - he taught me in this room. He taught me: keep your friends close, but your enemies closer. Why do you hurt me, Michael? I've always been loyal to you. It's a Sicilian message. It means Luca Brasi sleeps with the fishes. I don't like violence, Tom. I'm a businessman; blood is a big expense. Just when I thought I was out... they pull me back in. My father's name was Antonio Andolini... and this is for you. It's an old habit. I spent my whole life trying not to be careless. Women and children can afford to be careless, but not men. You can act like a man! The hotel, the casino. The Corleone Family wants to buy you out. Never hate your enemies. It affects your judgment. If anything in this life is certain, if history has taught us anything, it is that you can kill anyone. Your enemies always get strong on what you leave behind. Te salut, Don Corleone.";
  switch (modalViewModel.learningElementData.Value.type) {
    case "h5p":
      return <NewH5PContent viewModel={modalViewModel} />;
    case "text":
      return <TextComponent textContent={loremText} />;
    case "video":
      return <VideoComponent embedId="iik25wqIuFo?autoplay=1" />;
    case "image":
      return (
        <div className="w-full h-full">
          <ImageComponent
            imagesrc={
              "https://cdn.discordapp.com/attachments/887582352560246804/949558830486929458/Doku_Raumaufbau.png"
            }
          />
        </div>
      );
    default:
      return <div>No Learning Element selected</div>;
  }
};

export default function LearningElementModal() {
  const [viewModels, controllers] = useViewModelControllerProvider<
    LearningElementModalViewModel,
    LearningElementModalController
  >(LearningElementModalViewModel);
  const [isOpen, setOpen] = useObservable<boolean>(viewModels[0]?.isOpen);

  if (!isOpen) return null;
  if (!viewModels[0]) return null;

  const modalConfig = {
    text: "",
    image: "",
    video: "",
    h5p: "w-fit h-fit",
  };
  const modalType = viewModels[0].learningElementData.Value.type as
    | "text"
    | "image"
    | "video"
    | "h5p";
  return (
    <StyledModal
      title={
        viewModels[0]?.learningElementData?.Value?.type?.toUpperCase() +
        " Learning Element"
      }
      onClose={() => {
        setOpen(false);
        controllers[0].scoreLearningElement(viewModels[0]?.id.Value);
      }}
      showModal={isOpen}
      className={`flex flex-col justify-center gap-2 p-2 m-3 rounded-lg ${modalConfig[modalType]} `}
    >
      {elementBuilder(viewModels[0])}
    </StyledModal>
  );
}

import StyledButton from "../ReactBaseComponents/StyledButton";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import { LoadWorldController } from "../LoadWorldButton/LoadWorldController";

import MoodleLoginButton from "../MoodleLoginButton/MoodleLoginButton";
import DebugPanel from "../DebugPanel/DebugPanel";
import axios from "axios";

export default function MenuBar() {
  const loadWorldController = new LoadWorldController();

  return (
    <StyledContainer className="flex flex-col ml-0">
      <StyledButton
        onClick={async () => {
          await loadWorldController.loadWorld();
          // await loadWorldController.loadAvatar();
        }}
      >
        <img className="w-6 lg:w-10" src="icons/debug-icon.svg"></img>
      </StyledButton>
      <StyledButton
        onClick={() => {
          if (document.fullscreenElement) {
            document.exitFullscreen();
            window.screen.orientation.unlock();
          } else {
            document.documentElement.requestFullscreen();
            window.screen.orientation.lock("landscape");
          }
        }}
      >
        <img className="w-6 lg:w-10" src="icons/fullscreen-icon.svg"></img>
      </StyledButton>
      <MoodleLoginButton />
      <StyledButton onClick={debug}>
        <img
          className="w-6 lg:w-10"
          src="icons/download_file_moodle.svg"
          alt="Download File from Moodle"
        ></img>
      </StyledButton>
      <DebugPanel />
    </StyledContainer>
  );
}

const debug = () => {
  axios({
    url: "https://moodle.cluuub.xyz/webservice/pluginfile.php/278/mod_h5pactivity/package/0/Metriken%20Teil%201.h5p?token=86215250e2e449dccec1559ff8629b17", //your url
    method: "GET",
    responseType: "blob", // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "file.h5p"); //or any other extension
    document.body.appendChild(link);
    link.click();
  });
};

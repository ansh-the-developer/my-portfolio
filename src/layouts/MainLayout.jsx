import { useState } from "react";
import AppRoutes from "../routes/AppRoutes";
import Header from "./../components/organisms/Header/Header";
import MediaBar from "./../components/organisms/MediaBar/MediaBar";
import Footer from './../components/organisms/Footer/Footer';
import ResumeGatekeeper from "../components/organisms/ResumeGatekeeper/ResumeGatekeeper";
import ContactGatekeeper from "../components/organisms/ContactGatekeeper/ContactGatekeeper";
import PwaDownloadModal from "../components/organisms/PwaDownloadModal/PwaDownloadModal";
import WelcomeOverlay from "../components/organisms/WelcomeOverlay/WelcomeOverlay";
import CyberAudioController from "../components/organisms/CyberAudioController/CyberAudioController";
import AiAssistantGreeting from "../components/organisms/AiAssistantGreeting/AiAssistantGreeting";

const MainLayout = () => {
  const [startTriggered, setStartTriggered] = useState(false);

  return (
    <>
      <WelcomeOverlay onStart={(alreadySeen) => { if (!alreadySeen) setStartTriggered(true); }} />
      <CyberAudioController startTriggered={startTriggered} />
      <AiAssistantGreeting />

      <Header />
      <MediaBar />
      <ResumeGatekeeper />
      <ContactGatekeeper />
      <PwaDownloadModal />

      <main>
        <div className="content-rail">
          <AppRoutes />
        </div>
      </main>

      <Footer/>
    </>
  );
};

export default MainLayout;

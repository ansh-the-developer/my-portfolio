import AppRoutes from "../routes/AppRoutes";
import Header from "./../components/organisms/Header/Header";
import MediaBar from "./../components/organisms/MediaBar/MediaBar";
import Footer from './../components/organisms/Footer/Footer';
import ResumeGatekeeper from "../components/organisms/ResumeGatekeeper/ResumeGatekeeper";

const MainLayout = () => {
  return (
    <>
      <Header />
      <MediaBar />
      <ResumeGatekeeper />

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

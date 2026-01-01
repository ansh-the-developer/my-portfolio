import AppRoutes from "../routes/AppRoutes";
import Header from "./../components/organisms/Header/Header";
import MediaBar from "./../components/organisms/MediaBar/MediaBar";
import Footer from './../components/organisms/Footer/Footer';

const MainLayout = () => {
  return (
    <>
      <Header />
      <MediaBar />

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

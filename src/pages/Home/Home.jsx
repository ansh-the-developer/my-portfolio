// src/pages/Home/Home.jsx
import Hero from "../../components/organisms/Hero/Hero";
import Quote from "../../components/organisms/Quote/Quote";
import Projects from "../../components/organisms/Projects/Projects";
import Skills from "./../../components/organisms/Skills/Skills";
import About from "../../components/organisms/About.jsx/About";
import Contacts from './../../components/organisms/Contacts/Contacts';

const Home = () => {
  return (
    <>
      <Hero />
      <Quote />
      <Projects />
      <Skills />
      <About/>
      <Contacts/>
    </>
  );
};

export default Home;

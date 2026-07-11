// src/pages/Home/Home.jsx
import Hero from "../../components/organisms/Hero/Hero";
import Quote from "../../components/organisms/Quote/Quote";
import Projects from "../../components/organisms/Projects/Projects";
import Skills from "./../../components/organisms/Skills/Skills";
import About from "../../components/organisms/About.jsx/About";
import Contacts from './../../components/organisms/Contacts/Contacts';
import MetaTags from "../../components/atoms/MetaTags/MetaTags";
import CinematicReveal from "../../components/atoms/CinematicReveal/CinematicReveal";

const Home = () => {
  const homeSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Aman Joshi",
      "url": "https://amanthedeveloper.netlify.app/",
      "image": "https://amanthedeveloper.netlify.app/aj_logo_512.png",
      "jobTitle": "Full Stack Software Developer",
      "description": "Professional Full Stack Software Developer specializing in SaaS apps, internal systems (ITSM, ERP), e-commerce websites, and end-to-end business solutions across web and mobile platforms.",
      "worksFor": {
        "@type": "Organization",
        "name": "Workflare"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Haldwani",
        "addressRegion": "Uttarakhand",
        "addressCountry": "India"
      },
      "sameAs": [
        "https://github.com/ansh-the-developer",
        "https://www.linkedin.com/in/aman-joshi-engineer"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Aman Joshi Portfolio",
      "url": "https://amanthedeveloper.netlify.app/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://amanthedeveloper.netlify.app/projects?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ];

  return (
    <>
      <MetaTags
        title="Aman Joshi | Full Stack Software Developer Portfolio"
        description="Portfolio of Aman Joshi - professional React, Node, and Supabase developer. Specializing in high-fidelity HRMS suites, SaaS applications, internal systems (ITSM, ERP), and e-commerce websites (web & mobile apps) across Uttarakhand, India."
        schema={homeSchemas}
      />
      <CinematicReveal delay={0.1}>
        <Hero />
      </CinematicReveal>
      <CinematicReveal delay={0.15}>
        <Quote />
      </CinematicReveal>
      <CinematicReveal delay={0.15}>
        <Projects />
      </CinematicReveal>
      <CinematicReveal delay={0.15}>
        <Skills />
      </CinematicReveal>
      <CinematicReveal delay={0.15}>
        <About/>
      </CinematicReveal>
      <CinematicReveal delay={0.15}>
        <Contacts/>
      </CinematicReveal>
    </>
  );
};

export default Home;

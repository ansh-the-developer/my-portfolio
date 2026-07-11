// src/data/projectsData.js
import workflareImg from "../assets/images/projects/workflare.png";
import jewelryImg from "../assets/images/projects/jewelry.png";
import hrmsImg from "../assets/images/projects/hrms.png";
import travelImg from "../assets/images/projects/travel.png";
import pizzaImg from "../assets/images/projects/pizza.png";
import dashboardImg from "../assets/images/projects/dashboard.png";

export const clientProjects = [
  {
    title: "Workflare",
    tech: "React Node.js Express MongoDB",
    desc: "A premium business landing and services website for a web development agency.",
    image: workflareImg,
    liveUrl: "https://workflare.in/",
    githubUrl: null,
    requiresAuth: false,
  },
  {
    title: "Amaranto Jewels",
    tech: "React Tailwind Shopify Custom-Storefront",
    desc: "A luxury e-commerce platform for high-end designer jewelry collections.",
    image: jewelryImg,
    liveUrl: "https://amarantojewels.com/",
    githubUrl: null,
    requiresAuth: false,
  },
  {
    title: "Abel Jewels",
    tech: "React Tailwind Shopify Custom-Cart",
    desc: "An elegant showcase and online store for bespoke fine jewelry.",
    image: jewelryImg,
    liveUrl: "https://abeljewels.com/",
    githubUrl: null,
    requiresAuth: false,
  },
  {
    title: "Beekend Agency HRMS",
    tech: "Node.js Express PostgreSQL REST-API",
    desc: "SaaS client project live. Scalable backend service and database management API built for client agencies.",
    image: workflareImg,
    liveUrl: "https://beekend.workflare.in/",
    githubUrl: null,
    requiresAuth: false,
  },
  {
    title: "CMAK Homeopathy",
    tech: "HTML CSS JavaScript Netlify",
    desc: "Landing page and consultation portal for CMAK Homeopathy Clinic.",
    image: dashboardImg,
    liveUrl: "https://cmakhomeopathy.netlify.app/",
    githubUrl: null,
    requiresAuth: false,
  },
];

export const majorProjects = [
  {
    title: "Happy HR Systems",
    tech: "React Chakra UI Supabase Redux-Toolkit",
    desc: "v2 of Beekend - Beta Testing. A robust SaaS HRMS platform containing employee management, payroll pipelines, and interactive dashboards.",
    image: hrmsImg,
    liveUrl: "https://happyhrsystems.netlify.app/home",
    githubUrl: null,
    requiresAuth: true,
  },
];

export const demoProjects = [
  {
    title: "The Wild Oasis",
    tech: "React Styled-Components Supabase React-Query",
    desc: "Cabin booking and hotel administration system with comprehensive statistics dashboards.",
    image: hrmsImg,
    liveUrl: "https://the-wild-oasis-office.netlify.app/",
    githubUrl: "https://github.com/ansh-the-developer/the-wild-oasis",
    requiresAuth: true,
  },
  {
    title: "Fast React Pizza Co.",
    tech: "React Tailwind Redux-Toolkit React-Router",
    desc: "Cozy pizza ordering dashboard featuring cart management, user profile lookup, and order priority tracking.",
    image: pizzaImg,
    liveUrl: "https://pizzafastreact.netlify.app/",
    githubUrl: "https://github.com/ansh-the-developer/fast-react-pizza",
    requiresAuth: false,
  },
  {
    title: "WorldWise Travel Tracker",
    tech: "React CSS-Modules Leaflet-Maps",
    desc: "Map-based tracking application displaying visited cities and travel logs.",
    image: travelImg,
    liveUrl: "https://worldwiseadventuretracker.netlify.app/",
    githubUrl: "https://github.com/ansh-the-developer/worldwise",
    requiresAuth: false,
  },
  {
    title: "Weathering Clouds",
    tech: "React CSS Weather-API",
    desc: "Interactive weather dashboard showing real-time conditions and 5-day forecasts.",
    image: dashboardImg,
    liveUrl: "https://weatheringclouds.netlify.app/",
    githubUrl: "https://github.com/ansh-the-developer/weathering-clouds",
    requiresAuth: false,
  },
  {
    title: "Aman the Developer",
    tech: "React Tailwind Framer-Motion",
    desc: "Personal developer portfolio and showcase built with custom animations.",
    image: dashboardImg,
    liveUrl: "https://amanthedeveloper.netlify.app/",
    githubUrl: "https://github.com/ansh-the-developer/developer-portfolio",
    requiresAuth: false,
  },
  {
    title: "Trophy Mr Lee",
    tech: "HTML CSS JS Responsive",
    desc: "Responsive landing page about trophies, medals, and recognition solutions.",
    image: dashboardImg,
    liveUrl: "https://trophymrlee.netlify.app/",
    githubUrl: "https://github.com/ansh-the-developer/trophymrlee",
    requiresAuth: false,
  },
];

# Portfolio Website 🚀

A highly responsive, pixel-perfect personal portfolio website built with **React 19**, **Vite**, **Chakra UI v3**, and **CSS Modules**. The layout is strictly based on a Figma design prototype, offering smooth alignment via a single content rail system, premium typography, mobile-first responsiveness, and a fully connected backend with serverless notifications.

---

## 📂 Project Architecture & Directory Structure

Below is the detailed, file-by-file folder structure of the codebase. Each directory and key file has a designated role to maintain modularity and separation of concerns.

```text
portfolio/
├── .env                        # Local environment variables containing Supabase URL and Anon Key (gitignored)
├── .env.example                # Template for environment variables
├── .gitignore                  # Git exclude patterns
├── eslint.config.js            # Code syntax linting configurations
├── index.html                  # Core HTML structure template
├── package.json                # Project dependencies, scripts, and metadata
├── vite.config.js              # Vite compiler and React plugin setup
├── public/                     # Static assets served directly
│   └── Aman_Joshi_Resume.pdf   # The actual verified PDF resume document
├── src/
│   ├── App.jsx                 # Entry root application component rendering layouts and providers
│   ├── main.jsx                # DOM mounting point configuring ChakraProvider and AppRoot
│   ├── assets/                 # Media assets processed by the Vite bundler
│   │   ├── icons/              # UI vectors, shapes, and utility icons
│   │   │   ├── Dots.png        # Dot grid graphic assets
│   │   │   ├── Line.png        # Section title divider line
│   │   │   └── social/         # Social network platform icons (Figma, GitHub, LinkedIn, etc.)
│   │   └── images/             # Photographic raster graphics
│   │       ├── aboutImg.png    # About page profile graphics
│   │       └── heroImg.png     # Hero section main design graphics
│   ├── components/             # Reusable UI component architecture
│   │   └── organisms/          # Main structural components/sections
│   │       ├── About.jsx/      # About section homepage container
│   │       │   └── About.jsx
│   │       ├── Contacts/       # Contacts card homepage container
│   │       │   └── Contacts.jsx
│   │       ├── Footer/         # Footer with media links and copyright
│   │       │   └── Footer.jsx
│   │       ├── Header/         # Responsive navigation header containing hamburger mobile drawers
│   │       │   ├── Header.jsx
│   │       │   └── Header.module.css
│   │       ├── Hero/           # Introductory greeting block and main CTA buttons
│   │       │   ├── Hero.jsx
│   │       │   └── Hero.module.css
│   │       ├── MediaBar/       # Floating left-docked social profile bar
│   │       │   ├── MediaBar.jsx
│   │       │   └── MediaBar.module.css
│   │       ├── Projects/       # Featured home projects section
│   │       │   └── Projects.jsx
│   │       ├── Quote/          # Centered quotes design component
│   │       │   ├── Quote.jsx
│   │       │   └── Quote.module.css
│   │       ├── ResumeGatekeeper/ # Modal gating resume downloads behind a lead capture form
│   │       │   └── ResumeGatekeeper.jsx
│   │       └── Skills/         # Categorized skills listing grids
│   │           └── Skills.jsx
│   ├── data/                   # Centralized data structures
│   │   └── projectsData.js     # Master client work, SaaS apps, and demo projects listing database
│   ├── layouts/                # Global layout templates
│   │   └── MainLayout.jsx      # Groups Header, MediaBar, main content pages, and Footer
│   ├── pages/                  # Views linked to router paths
│   │   ├── About/              # Full profile page view + fun facts grid (About.jsx)
│   │   ├── Admin/              # Moderator login and administration dashboard views
│   │   │   ├── Dashboard.jsx   # Stats grid, searches, and moderation lists for quotes and downloads
│   │   │   └── Login.jsx       # Admin portal auth sign-in interface
│   │   ├── Contact/            # Dedicated contact page view + quote estimate forms (ContactPage.jsx)
│   │   └── Projects/           # Detailed projects explorer catalog layout (ProjectsPage.jsx)
│   ├── routes/                 # Routing configurations
│   │   └── AppRoutes.jsx       # React Router DOM mapping paths to pages
│   ├── styles/                 # Styling assets
│   │   ├── global.css          # Standard CSS resets, rail dimensions, and animations
│   │   └── variable.css        # CSS variable tokens (color palettes, grids, breakpoints)
│   └── utils/                  # Helper modules
│       └── supabaseClient.js   # Centralized `@supabase/supabase-js` client wrapper
```

---

## 🛠 Tech Stack

The application relies on a modern front-end stack for fast builds, responsive grids, and structured UI components:

*   **Core Framework**: [React 19](https://react.dev/) (utilizing concurrent rendering features).
*   **Build System**: [Vite 7](https://vite.dev/) (delivering high-performance Hot Module Replacement).
*   **Database**: [Supabase](https://supabase.com/) (PostgreSQL cloud database storing enquiries and download leads).
*   **Design System**: [Chakra UI v3](https://chakra-ui.com/) (employed for layout, grid alignments, spacing variables, and responsive hooks).
*   **Routing**: [React Router DOM v7](https://reactrouter.com/) (providing client-side dynamic page routing).
*   **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (delivering flexible vector symbols).
*   **Styling System**: A hybrid structure utilizing:
    *   **CSS Modules** (for structural isolates such as Header, Hero, MediaBar, and Quote to avoid class pollution).
    *   **Vanilla CSS Custom Properties** (for layout widths, default background-colors, and brand colors).
    *   **Chakra UI Box/Flex/Grid utility components** (for dynamic, stateful grids and mobile-first sizing).

---

## 📐 Layout & Styling Approach

The codebase employs strict positioning strategies to avoid layout shifting and guarantee a premium presentation matching the design system:

*   **Single Content Rail**: All main sections are bounded by a centered `.content-rail` class that caps width at `1024px` and maintains uniform lateral paddings.
*   **No Horizontal Scroll**: Layout components utilize defensive styling, where absolute graphics and overflows are clipped (`overflow-x: hidden` on body), preventing horizontal drift on mobile devices.
*   **CSS Theme Tokens**: Variable values are localized inside `variable.css` using custom CSS tokens (e.g. `--color-bg: #282C33`, `--color-primary: #C778DD`).
*   **Mobile-First Responsive Grids**: Structural segments (such as Skills, Projects, and Contacts) use Chakra UI's `SimpleGrid` and responsive array props (e.g., `columns={{ base: 1, md: 2, xl: 3 }}`) to wrap elements on smaller screens.

---

## 🚦 Routing Mappings

Client-side routes are mapped inside [AppRoutes.jsx](file:///e:/My%20Office/React%20Js%20Projects/My%20Portfolio%20Website/portfolio/src/routes/AppRoutes.jsx):

| Path | Element | Description |
| :--- | :--- | :--- |
| `/` | `Home.jsx` | Renders sections in sequence: Hero, Quote, Projects, Skills, About, Contacts. |
| `/projects` | `ProjectsPage.jsx` | Full listing page categorizing client-projects, major-projects, and demo-projects. |
| `/about` | `About.jsx` (Page) | Dedicated full about-me details page including personal fun facts grid. |
| `/contact` | `ContactPage.jsx` | Dedicated "Get a Quote" client request form with input checks. |
| `/login` | `Login.jsx` | Secure login view for administrative authentication. |
| `/admin` | `Dashboard.jsx` | Moderator overview board mapping stats and moderation controls. |

---

## 🚀 Key Features Implemented

### 1. Centralized Project Database
* Created [projectsData.js](file:///e:/My%20Office/React%20Js%20Projects/My%20Portfolio%20Website/portfolio/src/data/projectsData.js) mapping client works (Happy HR Systems, Beekend, Workflare, Amaranto Jewels, Abel Jewels, CMAK Homeopathy), major SaaS platforms (The Wild Oasis, Fast React Pizza), and demo applications.
* Aligned action links to toggle live deployments or trigger dynamic credentials modals for private portals.

### 2. Resume Gatekeeper Modal
* Gated all download links to your CV behind an interactive lead capture modal: [ResumeGatekeeper.jsx](file:///e:/My%20Office/React%20Js%20Projects/My%20Portfolio%20Website/portfolio/src/components/organisms/ResumeGatekeeper/ResumeGatekeeper.jsx).
* Enforces Name, Email, and Phone fields as strictly mandatory with frontend format validations prior to allowing downloading of the actual resume document.
* Automatically registers lead profiles in your database.

### 3. Database & Admin Portal Integration
* Set up a [supabaseClient.js](file:///e:/My%20Office/React%20Js%20Projects/My%20Portfolio%20Website/portfolio/src/utils/supabaseClient.js) client interface using Vite environment configurations.
* Created an [Admin Login](file:///e:/My%20Office/React%20Js%20Projects/My%20Portfolio%20Website/portfolio/src/pages/Admin/Login.jsx) page requiring password authentication (restricting dashboard viewing to your administrator email: `amanjoshi16011997@gmail.com`).
* Created a clean [Admin Dashboard](file:///e:/My%20Office/React%20Js%20Projects/My%20Portfolio%20Website/portfolio/src/pages/Admin/Dashboard.jsx) with tab navigations to track stats, search, filter, and moderate (delete logs) both **Quote Enquiries** and **Resume Download Leads**.

### 4. 100% Free Serverless Push Notifications (Gmail & Telegram)
* Integrated Supabase Insert Database Webhooks linked to a serverless **Google Apps Script Web App** to dispatch alerts completely for free:
  * **Gmail**: Formatted HTML notification sent to `amanjoshi16011997@gmail.com`.
  * **Telegram**: Direct push alerts sent to your phone via your custom bot `t.me/ansh_portfolio_alerts_bot`.

---

## ⚡ Development & Deployment Commands

The project configuration defines standard NPM commands mapping to Vite compiler actions:

### Install Dependencies
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
Starts a local development server with Hot Module Replacement (HMR).

### Build for Production
```bash
npm run build
```
Compiles and optimizes the React package into the static assets folder `/dist`.

### Preview Production Build Locally
```bash
npm run preview
```
Runs a local server hosting the compiled build in `/dist` for verification before hosting.

### Run Code Linter
```bash
npm run lint
```
Checks files using ESLint rules as configured in `eslint.config.js`.

---

## 📊 Current Project Status

| Segment | Status | Notes |
| :--- | :--- | :--- |
| **Header (Desktop & Mobile Nav)** | ✅ Completed | Styled links, interactive menu drawer, and active state indicators. |
| **Hero Landing Section** | ✅ Completed | Graphic elements, layouts, and CV Download action buttons styled. |
| **MediaBar Social Dock** | ✅ Completed | Aligned floating list layout linking directly to user profiles. |
| **Projects Previews (Home)** | ✅ Completed | Card lists displaying primary preview columns dynamically. |
| **Skills Stack Lists** | ✅ Completed | Configured simple grids mapping your technical skills categories. |
| **About Me Showcase** | ✅ Completed | Bio descriptions synchronized with verified resume experience. |
| **Get a Quote Page (`/contact`)** | ✅ Completed | Form validation, loading indicators, database hook, and Bug Fixes. |
| **Admin Dashboard (`/admin`)** | ✅ Completed | Gated moderator dashboard tracking quote requests and resume leads. |
| **Serverless Notifications** | ✅ Completed | Configured Google Web App trigger webhooks for Gmail and Telegram. |

---

## ⚡ PWA & SEO Strategy Setup

### Progressive Web App (PWA) Configuration
* **Service Worker**: Managed inside [sw.js](file:///e:/My%20Office/React%20Js%20Projects/My%20Portfolio%20Website/portfolio/public/sw.js) for high-speed offline capabilities and installability recognition.
* **App Manifest**: Linked through [manifest.json](file:///e:/My%20Office/React%20Js%20Projects/My%20Portfolio%20Website/portfolio/public/manifest.json) specifying branding schemes, background colors, circular AJ logo vectors (`192px`/`512px`), and standalone portrait orientations.
* **Download Modal Gating**: An interactive, premium installer dialog [PwaDownloadModal.jsx](file:///e:/My%20Office/React%20Js%20Projects/My%20Portfolio%20Website/portfolio/src/components/organisms/PwaDownloadModal/PwaDownloadModal.jsx) triggers automatically on tab/window load sessions, stashing standard browser prompts and triggering direct download actions.

### Search Engine Optimization (SEO) & Structured Schema
* **Dynamic Meta Management**: Built custom [MetaTags.jsx](file:///e:/My%20Office/React%20Js%20Projects/My%20Portfolio%20Website/portfolio/src/components/atoms/MetaTags/MetaTags.jsx) handling immediate document titles, page descriptions, canonical paths, Open Graph objects, and Twitter cards per route mount.
* **Structured Data**: Injected target JSON-LD metadata for crawlers:
  * **Home Page**: `Person` (credentials, socials) and `WebSite` search descriptors.
  * **About Page**: `AboutPage` mapping career paths and specialized software skill fields.
  * **Projects Page**: `ItemList` dynamically grouping all creative work and client projects.
  * **Contact Page**: `ContactPage` coupled with `ProfessionalService` schemas for geolocalized targeting.
* **Robots and Sitemap**: Created [robots.txt](file:///e:/My%20Office/React%20Js%20Projects/My%20Portfolio%20Website/portfolio/public/robots.txt) and [sitemap.xml](file:///e:/My%20Office/React%20Js%20Projects/My%20Portfolio%20Website/portfolio/public/sitemap.xml) for crawlers.

---

## 🎨 Cinematic Digital Experience & Mozart Synthesizer

### Dynamic Interface Reveals & Grid Overlays
* **Cinematic Reveal Wrapper**: Built [CinematicReveal.jsx](file:///e:/My%20Office/React%20Js%20Projects/My%20Portfolio%20Website/portfolio/src/components/atoms/CinematicReveal/CinematicReveal.jsx) component. It wraps major page elements to trigger:
  * Absolute top/right wireframe drawing borders
  * A neon purple horizontal scanline sweeping down
  * Blurred-to-sharp container opacity transitions on scroll triggers
  * Scan-grid horizontal line overlays that fade out
* **Home Page Integration**: Replaced standard fades in [Home.jsx](file:///e:/My%20Office/React%20Js%20Projects/My%20Portfolio%20Website/portfolio/src/pages/Home/Home.jsx#L48) to progressive reveals. Bypassed automatically when `prefers-reduced-motion` is set.

### Global Contextual AI Guide
* **Path-Specific Narrator**: Refactored [AiAssistantGreeting.jsx](file:///e:/My%20Office/React%20Js%20Projects/My%20Portfolio%20Website/portfolio/src/components/organisms/AiAssistantGreeting/AiAssistantGreeting.jsx) to track client route location changes (`useLocation`) and update text captions and voice synthesis contextually (Home, Projects, About, Contact).
* **Vocal Synthesis & Visualizer**: Leverages browser speech API (`window.speechSynthesis`) to speak greetings using local neutral English voices. Displays absolute responsive volume sliders, mute/disable controls, and sound visual waves. State preferences are persisted in `localStorage`.

### Mozart Classical Audio Scheduler
* **Sonata Sequencer**: Overwrote [CyberAudioController.jsx](file:///e:/My%20Office/React%20Js%20Projects/My%20Portfolio%20Website/portfolio/src/components/organisms/CyberAudioController/CyberAudioController.jsx) to loop the opening theme of Mozart's *Sonata in C Major (K.545)*.
* **Pluck Synth**: Generates double piano string oscillators (triangle carrier and sine overtone harmonics) governed by rapid-attack exponential-decay envelopes, scheduled 300ms in advance (0 KB assets overhead). Includes volume sliders and mute toggles.

---

## 📚 Configuration Guides

Detailed walkthroughs for backend configurations are available inside:
*   [supabase_setup_guide.md](file:///C:/Users/aman/.gemini/antigravity-ide/brain/3d00a168-eedb-42a8-93e0-095416100b1f/supabase_setup_guide.md) (Database tables, RLS Policies, secrets)
*   [free_notifications_setup.md](file:///C:/Users/aman/.gemini/antigravity-ide/brain/3d00a168-eedb-42a8-93e0-095416100b1f/free_notifications_setup.md) (Google Web App & Telegram bot config guide)



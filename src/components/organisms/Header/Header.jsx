import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../../assets/images/hlogo.png";
import hamIcon from "../../../assets/icons/hamIcon.png";
import github from "../../../assets/icons/social/Github.png";
import vector from "../../../assets/icons/social/Vector.png";
import figma from "../../../assets/icons/social/Figma.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const getLinkClass = ({ isActive }) => (isActive ? styles.active : "");

  return (
    <>
      <header className={styles.header}>
        <div className={`content-rail ${styles.container}`}>
          <div className={styles.left}>
            <NavLink to="/">
              <img src={logo} alt="logo" className={styles.logo} />
            </NavLink>
            <span className={styles.name}>Aman</span>
          </div>

          {/* Desktop nav */}
          <nav className={styles.nav}>
            <NavLink to="/" end className={getLinkClass}>
              <span>#</span>home
            </NavLink>
            <NavLink to="/projects" className={getLinkClass}>
              <span>#</span>works
            </NavLink>
            <NavLink to="/about" className={getLinkClass}>
              <span>#</span>about-me
            </NavLink>
            <NavLink to="/contact" className={getLinkClass}>
              <span>#</span>contacts
            </NavLink>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-resume-gatekeeper"))}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-gray)",
                cursor: "pointer",
                fontFamily: '"Fira Code", monospace',
                fontSize: "16px",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.color = "var(--color-white)")}
              onMouseOut={(e) => (e.target.style.color = "var(--color-gray)")}
            >
              <span style={{ color: "var(--color-primary)" }}>#</span>resume
            </button>
            <div className={styles.lang}>EN ▾</div>
          </nav>

          {/* Mobile hamburger */}
          <button className={styles.hamBtn} onClick={() => setMenuOpen(true)}>
            <img src={hamIcon} alt="menu" />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <button
            className={styles.closeBtn}
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>

          <nav className={styles.mobileNav}>
            <NavLink to="/" end className={getLinkClass} onClick={() => setMenuOpen(false)}>
              <span>#</span>home
            </NavLink>
            <NavLink to="/projects" className={getLinkClass} onClick={() => setMenuOpen(false)}>
              <span>#</span>works
            </NavLink>
            <NavLink to="/about" className={getLinkClass} onClick={() => setMenuOpen(false)}>
              <span>#</span>about-me
            </NavLink>
            <NavLink to="/contact" className={getLinkClass} onClick={() => setMenuOpen(false)}>
              <span>#</span>contacts
            </NavLink>
            <button
              onClick={() => {
                setMenuOpen(false);
                window.dispatchEvent(new CustomEvent("open-resume-gatekeeper"));
              }}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-gray)",
                cursor: "pointer",
                fontFamily: '"Fira Code", monospace',
                fontSize: "24px",
                padding: 0,
                textAlign: "left",
              }}
            >
              <span style={{ color: "var(--color-primary)" }}>#</span>resume
            </button>
            <div className={styles.mobileLang}>EN ▾</div>
          </nav>
          <div className={styles.mobileSocials}>
            <a href="https://github.com/ansh-the-developer" target="_blank" rel="noreferrer">
              <img src={github} alt="github" />
            </a>
            <a href="https://www.linkedin.com/in/aman-joshi-engineer" target="_blank" rel="noreferrer">
              <img src={vector} alt="linkedin" />
            </a>
            <a href="https://figma.com" target="_blank" rel="noreferrer">
              <img src={figma} alt="figma" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

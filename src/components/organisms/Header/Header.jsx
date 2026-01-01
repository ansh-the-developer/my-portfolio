import { useState } from "react";
import styles from "./Header.module.css";
import logo from "../../../assets/images/hlogo.png";
import hamIcon from "../../../assets/icons/hamIcon.png";
import github from "../../../assets/icons/social/Github.png";
import vector from "../../../assets/icons/social/Vector.png";
import figma from "../../../assets/icons/social/Figma.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={`content-rail ${styles.container}`}>
          <div className={styles.left}>
            <img src={logo} alt="logo" className={styles.logo} />
            <span className={styles.name}>Aman</span>
          </div>

          {/* Desktop nav */}
          <nav className={styles.nav}>
            <a href="#home" className={styles.active}>
              <span>#</span>home
            </a>
            <a href="#projects">
              <span>#</span>works
            </a>
            <a href="#about-me">
              <span>#</span>about-me
            </a>
            <a href="#contacts">
              <span>#</span>contacts
            </a>
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
            <a className={styles.active}>
              <span>#</span>home
            </a>
            <a>
              <span>#</span>works
            </a>
            <a>
              <span>#</span>about-me
            </a>
            <a>
              <span>#</span>contacts
            </a>
            <div className={styles.mobileLang}>EN ▾</div>
          </nav>
          <div className={styles.mobileSocials}>
            <img src={github} alt="github" />
            <img src={vector} alt="vector" />
            <img src={figma} alt="figma" />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

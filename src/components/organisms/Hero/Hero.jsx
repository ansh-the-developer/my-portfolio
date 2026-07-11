import { Link } from "react-router-dom";
import styles from "./Hero.module.css";
import heroImg from "../../../assets/images/heroImg.png";
import heroLogo from "../../../assets/icons/heroLogo.png";
import dots from "../../../assets/icons/Dots.png";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="content-rail">
        <div className={styles.layout}>
          {/* LEFT SIDE */}
          <div className={styles.left}>
            <h1 className={styles.title}>
              Aman is a <span>web designer</span> and <br />
              <span>front-end developer</span>
            </h1>

            <p className={styles.subtitle}>
              He crafts responsive websites where technologies meet creativity
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link to="/contact" className={styles.cta} style={{ display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                Contact me!!
              </Link>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-resume-gatekeeper"))}
                className={styles.cta}
                style={{
                  borderColor: "var(--color-gray)",
                  color: "var(--color-gray)",
                  width: "148px",
                  height: "37px",
                  padding: "8px 8px",
                  background: "transparent",
                  fontFamily: '"Fira Code", monospace',
                  fontSize: "16px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = "var(--color-white)";
                  e.target.style.color = "var(--color-white)";
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = "var(--color-gray)";
                  e.target.style.color = "var(--color-gray)";
                }}
              >
                Download CV
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className={styles.right}>
            <div className={styles.imageWrap}>
              <img src={heroLogo} alt="hero logo" className={styles.heroLogo} />
              <img src={heroImg} alt="hero" className={styles.heroImage} />
              <img src={dots} alt="dots" className={styles.dots} />
            </div>

            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              <span>
                Currently working on <strong>Portfolio</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

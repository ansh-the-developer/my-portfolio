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

            <button className={styles.cta}>Contact me!!</button>
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

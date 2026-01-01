// src/components/organisms/Quote/Quote.jsx
import styles from "./Quote.module.css";
import quoteIcon from "../../../assets/icons/quoteIcon.png";
import rect26 from "../../../assets/icons/Rect26.png";

const Quote = () => {
  return (
    <section className={styles.quoteSection}>
      <div className="content-rail">
        <div className={styles.wrapper}>
          <img src={rect26} alt="" className={styles.rect} />

          <div className={styles.card}>
            {/* row 1: top quote */}
            <div className={styles.topQuote}>
              <img src={quoteIcon} alt="quote" />
            </div>

            {/* row 2: text */}
            <p className={styles.text}>
              With great power comes great electricity bill
            </p>

            {/* row 3: bottom quote right aligned */}
            <div className={styles.bottomRow}>
              <img src={quoteIcon} alt="quote" className={styles.bottomQuote} />
            </div>

            {/* author box outside, bottom-right */}
            <div className={styles.authorBox}>
              <span className={styles.author}>- Dr. Who</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quote;

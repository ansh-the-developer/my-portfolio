import styles from "../MediaBar/MediaBar.module.css";
import github from "../../../assets/icons/social/Github.png";
import { FaLinkedin } from "react-icons/fa";

const MediaBar = () => {
  return (
    <aside className={styles.media}>
      <div className={styles.line} />

      <a href="https://github.com/ansh-the-developer" target="_blank" rel="noreferrer">
        <img src={github} alt="github" />
      </a>

      <a
        href="https://www.linkedin.com/in/aman-joshi-engineer"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#abb2bf", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <FaLinkedin size="22px" />
      </a>
    </aside>
  );
};

export default MediaBar;

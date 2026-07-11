import styles from "../MediaBar/MediaBar.module.css";
import github from "../../../assets/icons/social/Github.png";
import vector from "../../../assets/icons/social/Vector.png";
import figma from "../../../assets/icons/social/Figma.png";

const MediaBar = () => {
  return (
    <aside className={styles.media}>
      <div className={styles.line} />

      <a href="https://github.com/ansh-the-developer" target="_blank" rel="noreferrer">
        <img src={github} alt="github" />
      </a>

      <a href="https://www.linkedin.com/in/aman-joshi-engineer" target="_blank" rel="noreferrer">
        <img src={vector} alt="linkedin" />
      </a>

      <a href="https://figma.com" target="_blank" rel="noreferrer">
        <img src={figma} alt="figma" />
      </a>
    </aside>
  );
};

export default MediaBar;

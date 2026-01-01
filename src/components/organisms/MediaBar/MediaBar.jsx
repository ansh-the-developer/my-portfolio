import styles from "../MediaBar/MediaBar.module.css";
import github from "../../../assets/icons/social/Github.png";
import vector from "../../../assets/icons/social/Vector.png";
import figma from "../../../assets/icons/social/Figma.png";

const MediaBar = () => {
  return (
    <aside className={styles.media}>
      <div className={styles.line} />

      <img src={github} alt="github" />

      <img src={vector} alt="vector" />

      <img src={figma} alt="figma" />
    </aside>
  );
};

export default MediaBar;

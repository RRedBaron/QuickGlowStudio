import styles from "./Intro.module.css";

function Intro() {
    return (
        <div className={styles.intro}>
            <h1 className={styles.introTitle}>TOP-1 Photo Studio in Ukraine</h1>
            <p className={styles.introSlogan}>"Capture. Create. Cherish."</p>
        </div>
    );
}

export default Intro;
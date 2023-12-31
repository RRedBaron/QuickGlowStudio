import styles from "./Description.module.css";

function Description() {
    return (
        <div className={styles.description}>
            <p className={styles.descriptionSlogan}><strong>Diversity</strong><br/>is the<br/> new perfection</p>
            <p className={styles.descriptionText}>We are large production space and a creative community based in Kyiv,
                Ukraine. Collaborating with
                inspired creatives, we produce authentic photo and video stories. We’ve gathered the best professionals
                and the most reliable equipment to ensure the best conditions for a photographer. Four large-scale
                cycloramas, 9 stages for interior and still-life shooting, and event space.</p>
        </div>
    )
}

export default Description;
import styles from "./Portfolio.module.css";
import PortfolioSlider from "../PortfolioSlider/PortfolioSlider.tsx";

function Portfolio() {
    return (
        <div className={styles.portfolio}>
            <div className={styles.portfolioHeader}>
                <h1 className={styles.portfolioTitle}>Portfolio</h1>
                <p className={styles.portfolioText}>Samples of works shot by our team: at stages of QuickGlow studio and
                    outside the studio.</p>
            </div>
            <PortfolioSlider/>
        </div>
    )
}

export default Portfolio;
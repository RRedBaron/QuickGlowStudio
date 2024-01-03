import styles from "./Reviews.module.css";
import ReviewCard from "../ReviewCard/ReviewCard.tsx";

function Reviews() {
    return (
        <div className={styles.reviews}>
            <h3 className={styles.reviewsTitle}>Customer Reviews</h3>
            <div className={styles.reviewsContainer}>
                <ReviewCard />
                <ReviewCard display={"laptop"}/>
                <ReviewCard display={"desktop"}/>
            </div>
        </div>
    )
}

export default Reviews;
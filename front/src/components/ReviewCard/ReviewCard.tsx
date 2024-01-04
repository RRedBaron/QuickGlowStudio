import styles from "./ReviewCard.module.css";

interface ReviewCardProps {
    display?: "desktop" | "laptop" | "mobile";
}

function ReviewCard({display = "mobile"}: ReviewCardProps) {
    return (
        <div
            className={display === "desktop" ? styles.reviewCard : display === "laptop" ? styles.reviewCardLaptop : styles.reviewCardMobile}>

        </div>
    )
}

export default ReviewCard;
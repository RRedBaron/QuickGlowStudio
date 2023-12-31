import {doc, updateDoc} from "firebase/firestore";
import {firestoreDb} from "../../firebase-config.ts";
import {toggleRejectModal} from "../../redux/slices/adminModalSlice.ts";
import {Booking} from "../../types/booking";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import styles from "./RejectBookingModal.module.css";

interface BookingRowProps {
    booking: Booking
}

function RejectBookingModal({booking}: BookingRowProps) {
    const dispatch = useAppDispatch();

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            dispatch(toggleRejectModal());
        }
    }

    const handleRejectClick = async () => {
        const bookingRef = doc(firestoreDb, "bookings", booking.id);
        try {
            await updateDoc(bookingRef, {
                status: "rejected"
            });
            dispatch(toggleRejectModal());
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={styles.modalWrapper} onMouseDown={handleModalClick}>
            <div className={styles.modalContent}>
                <h1 className={styles.modalTitle}>Confirm rejecting</h1>
                <div className={styles.modalButtonsWrapper}>
                    <button className={styles.rejectButton} onClick={handleRejectClick}>Reject</button>
                    <button className={styles.cancelButton} onClick={() => dispatch(toggleRejectModal())}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RejectBookingModal;
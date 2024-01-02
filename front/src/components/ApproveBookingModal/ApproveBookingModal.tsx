import {useAppDispatch} from '../../hooks/useAppDispatch';
import {toggleApproveModal} from '../../redux/slices/adminModalSlice';
import {Booking} from '../../types/booking';
import styles from './ApproveBookingModal.module.css';
import React, {useState} from "react";
import {firestoreDb} from "../../firebase-config.ts";
import {doc, updateDoc} from 'firebase/firestore';

interface BookingRowProps {
    booking: Booking
}

function ApproveBookingModal({booking}: BookingRowProps) {
    const dispatch = useAppDispatch();
    const [price, setPrice] = useState(booking.price);
    const [comment, setComment] = useState("");

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            dispatch(toggleApproveModal());
        }
    }

    const handleApproveClick = async () => {
        const bookingRef = doc(firestoreDb, "bookings", booking.id);
        try {
            await updateDoc(bookingRef, {
                price: price,
                status: "approved",
                comment: comment
            });
            dispatch(toggleApproveModal());
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    }

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(+e.target.value);
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    }

    return (
        <div className={styles.modalWrapper} onMouseDown={handleModalClick}>
            <div className={styles.modalContent}>
                <h1 className={styles.modalTitle}>Confirm booking</h1>
                <div className={styles.dateRow}>
                    <p className={styles.dateTitle}>Date: {booking.selectedDate}</p>
                    <p className={styles.dateTitle}>Time: {booking.selectedTime}</p>
                </div>
                <div className={styles.typeRow}>
                    <p className={styles.typeTitle}>Type: {booking.selectedType}</p>
                </div>
                <div className={styles.detailsRow}>
                    <p className={styles.detailsTitle}>Details:</p>
                    <p className={styles.detailsText}>{booking.details}</p>
                </div>

                <div className={styles.priceRow}>
                    <p className={styles.priceTitle}>Final price:</p>
                    <input className={styles.priceInput} defaultValue={booking.price} type="number"
                           onChange={handlePriceChange}/>
                    <span className={styles.priceCurrency}>$</span>
                </div>
                <div className={styles.commentsWrapper}>
                    <textarea className={styles.commentsInput} placeholder={"Comments"} onChange={handleCommentChange}/>
                </div>
                <div className={styles.modalButtonsWrapper}>
                    <button className={styles.approveButton} onClick={handleApproveClick}>Approve</button>
                    <button className={styles.cancelButton} onClick={() => {
                        dispatch(toggleApproveModal());
                    }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ApproveBookingModal;
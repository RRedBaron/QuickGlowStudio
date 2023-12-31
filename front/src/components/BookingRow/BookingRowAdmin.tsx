import styles from "./BookingRow.module.css"
import {Booking} from "../../types/booking";
import ApproveBookingModal from "../ApproveBookingModal/ApproveBookingModal.tsx";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import RejectBookingModal from "../RejectBookingModal/RejectBookingModal.tsx";

interface BookingRowProps {
    booking: Booking,
    selectedBooking: Booking | null,
    onApproveClick: () => void,
    onRejectClick: () => void
}

function BookingRowAdmin({booking, selectedBooking, onApproveClick, onRejectClick}: BookingRowProps) {
    const isApproveModalOpen = useAppSelector(state => state.adminModal.isApproveOpen);
    const isRejectModalOpen = useAppSelector(state => state.adminModal.isRejectOpen);

    const backgroundColor = booking.status === "approved" ? "#D2E3C8" : booking.status === "rejected" ? "#EF9595" : "F0F0F0";

    return (
        <div className={styles.bookingRow} style={{"backgroundColor": backgroundColor}}>
            <div className={styles.bookingRowCell}>
                <p>{booking.selectedDate} {booking.selectedTime}</p>
            </div>
            <div className={styles.bookingRowCell}>
                <p>{booking.selectedType}</p>
            </div>
            <div className={styles.bookingRowCell}>
                <p>{booking.price}</p>
            </div>
            <div className={styles.bookingRowCell}>
                {booking.status !== "approved" ?
                    <button className={styles.approveButton} onClick={onApproveClick}>+</button> : null}
                {booking.status !== "rejected" ?
                    <button className={styles.declineButton} onClick={onRejectClick}>-</button> : null}
            </div>
            {isApproveModalOpen && <ApproveBookingModal booking={selectedBooking || booking}/>}
            {isRejectModalOpen && <RejectBookingModal booking={booking}/>}
        </div>
    );
}

export default BookingRowAdmin;
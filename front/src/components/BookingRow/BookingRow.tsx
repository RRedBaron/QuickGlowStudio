import styles from "./BookingRow.module.css"
import {Booking} from "../../types/booking";

interface BookingRowProps {
    booking: Booking
}

function BookingRow({booking}: BookingRowProps) {
    return (
        <div className={styles.bookingRow}>
            <div className={styles.bookingRowCell}>
                <p>{booking.selectedDate} {booking.selectedTime}</p>
            </div>
            <div className={styles.bookingRowCell}>
                <p>{booking.selectedType}</p>
            </div>
            <div className={styles.bookingRowCell}>
                <p>{booking.price} $</p>
            </div>
            <div className={styles.bookingRowCell}>
                <p>{booking.status}</p>
            </div>
        </div>
    );
}

export default BookingRow;
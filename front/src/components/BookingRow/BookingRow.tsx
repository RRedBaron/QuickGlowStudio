import styles from "./BookingRow.module.css"
import {Booking} from "../../types/booking";

interface BookingRowProps {
    booking: Booking
}

function BookingRow({booking}: BookingRowProps) {
    const createdAtDate = new Date(booking.createdAt);
    const backgroundColor = booking.status === "approved" ? "#D2E3C8" : booking.status === "rejected" ? "#EF9595" : "F0F0F0";

    const formattedCreatedAt =
        `${createdAtDate.getFullYear()}-${padZero(createdAtDate.getMonth() + 1)}-${padZero(createdAtDate.getDate())} ` +
        `${padZero(createdAtDate.getHours())}:${padZero(createdAtDate.getMinutes())}`;

    function padZero(num: number) {
        return num.toString().padStart(2, '0');
    }

    return (
        <div className={styles.bookingRow} style={{"backgroundColor": backgroundColor}}>

            <div className={styles.bookingRowCell}>
                <p>{formattedCreatedAt}</p>
            </div>

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
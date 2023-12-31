import styles from "./pagesStyles/UserPage.module.css";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";
import {useEffect, useState} from "react";
import {DocumentData, collection, getDocs} from "firebase/firestore";
import {firestoreDb} from "../firebase-config.ts";
import {Booking} from "../types/booking";
import BookingRowAdmin from "../components/BookingRow/BookingRowAdmin.tsx";
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {toggleApproveModal, toggleRejectModal} from "../redux/slices/adminModalSlice.ts";


interface BookingsState {
    bookings: Array<Booking>
}

const initialBookingsState: BookingsState = {
    bookings: []
};

const BOOKINGS_PER_PAGE = 4;

function AdminPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {isAuth, isAdmin} = useAuth();
    const [bookings, setBookings] = useState<BookingsState>(initialBookingsState);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const handleApproveClick = (booking: Booking) => {
        setSelectedBooking(booking);
        dispatch(toggleApproveModal());
    };

    const handleRejectClick = (booking: Booking) => {
        setSelectedBooking(booking);
        dispatch(toggleRejectModal());
    };


    useEffect(() => {
        const bookingRef = collection(firestoreDb, "bookings");

        async function getBookings() {
            const bookingsSnapshot = await getDocs(bookingRef);
            const bookingsList = bookingsSnapshot.docs.map((doc: DocumentData) =>
                ({
                    ...doc.data(),
                    id: doc.id
                }));
            console.log(bookingsList)
            setBookings({bookings: bookingsList});
        }

        getBookings();
    }, [isAuth]);

    if (!isAuth) {
        navigate("/login");
    }

    if (!isAdmin) {

        navigate("/userpage");
    }

    const indexOfLastBooking = currentPage * BOOKINGS_PER_PAGE;
    const indexOfFirstBooking = indexOfLastBooking - BOOKINGS_PER_PAGE;
    const currentBookings = bookings.bookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className={styles.userPageWrapper}>
                <div className={styles.userPageHeader}>
                    <h2 className={styles.userPageHeaderTitle}>Admin page</h2>
                </div>
                <div className={styles.bookingsWrapper}>
                    {
                        bookings.bookings.length > 0 &&
                        <div className={styles.bookingsHeader}>
                            <div className={styles.bookingsHeaderCell}>
                                <p>Date</p>
                            </div>
                            <div className={styles.bookingsHeaderCell}>
                                <p>Type</p>
                            </div>
                            <div className={styles.bookingsHeaderCell}>
                                <p>Estimated price</p>
                            </div>
                            <div className={styles.bookingsHeaderCell}>
                            </div>
                        </div>
                    }
                    {currentBookings.map((booking: Booking, index) => (
                        <BookingRowAdmin booking={booking} key={index}
                                         selectedBooking={selectedBooking}
                                         onApproveClick={() => handleApproveClick(booking)}
                                         onRejectClick={() => handleRejectClick(booking)}/>
                    ))}
                    {bookings.bookings.length === 0 &&
                        <h3 className={styles.noBookingsLabel}>No bookings to approve</h3>}
                </div>
                <div className={styles.pagesButtonsWrapper}>
                    <button
                        className={styles.pagesButton}
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        {"<"}
                    </button>
                    {Array.from({length: Math.ceil(bookings.bookings.length / BOOKINGS_PER_PAGE)}).map(
                        (_, index) => (
                            <button
                                key={index}
                                className={`${styles.pagesButton} ${currentPage === index + 1 ? styles.activePage : ""}`}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        )
                    )}
                    <button
                        className={styles.pagesButton}
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(bookings.bookings.length / BOOKINGS_PER_PAGE)}
                    >
                        {">"}
                    </button>
                </div>
            </div>
        </>

    );
}

export default AdminPage;
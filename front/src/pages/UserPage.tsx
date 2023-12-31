import BookingRow from "../components/BookingRow/BookingRow.tsx";
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {toggleBookModal} from "../redux/slices/bookModalSlice.ts";
import styles from "./pagesStyles/UserPage.module.css";
import CreateBookingModal from "../components/CreateBookingModal/CreateBookingModal.tsx";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";
import {useEffect, useState} from "react";
import {DocumentData, collection, getDocs, query, where} from "firebase/firestore";
import {firestoreDb} from "../firebase-config.ts";
import {Booking} from "../types/booking";

interface BookingsState {
    bookings: Array<Booking>
}

const initialBookingsState: BookingsState = {
    bookings: []
};

const BOOKINGS_PER_PAGE = 4;

function UserPage() {
    const dispatch = useAppDispatch();
    const isModalOpen = useAppSelector(state => state.bookModal.isOpen);
    const navigate = useNavigate();
    const {isAuth, uid, isAdmin} = useAuth();
    const [bookings, setBookings] = useState<BookingsState>(initialBookingsState);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const bookingRef = query(collection(firestoreDb, "bookings"), where("uid", "==", uid));

        async function getBookings() {
            const bookingsSnapshot = await getDocs(bookingRef);
            const bookingsList = bookingsSnapshot.docs.map((doc: DocumentData) => ({
                ...doc.data(),
                id: doc.id
            }));
            setBookings({bookings: bookingsList});
        }

        getBookings();
    }, [isAuth, uid]);

    if (!isAuth) {
        navigate("/login");
    }

    if (isAdmin) {
        navigate("/admin");
    }

    const toggleModal = () => {
        dispatch(toggleBookModal());
    };

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
                    <h2 className={styles.userPageHeaderTitle}>Your Sessions</h2>
                    <button className={styles.createBookingButton} onClick={toggleModal}>Book a session</button>
                </div>
                <div className={styles.bookingsWrapper}>
                    {
                        bookings.bookings.length > 0 &&
                        <div className={styles.bookingsHeader}>
                            <div className={styles.bookingsHeaderCell}>
                                <p>Date</p>
                            </div>
                            <div className={styles.bookingsHeaderCell}>
                                <p>Details</p>
                            </div>
                            <div className={styles.bookingsHeaderCell}>
                                <p>Price</p>
                            </div>
                            <div className={styles.bookingsHeaderCell}>
                                <p>Status</p>
                            </div>
                        </div>
                    }
                    {currentBookings.map((booking: Booking, index) => (
                        <BookingRow booking={booking} key={index}/>
                    ))}
                    {bookings.bookings.length === 0 && <h3 className={styles.noBookingsLabel}>No bookings yet :(</h3>}
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
            {isModalOpen && <CreateBookingModal/>}
        </>


    );
}

export default UserPage;
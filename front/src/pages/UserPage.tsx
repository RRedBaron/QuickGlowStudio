import BookingRow from "../components/BookingRow/BookingRow.tsx";
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {toggleBookModal} from "../redux/slices/bookModalSlice.ts";
import styles from "./pagesStyles/UserPage.module.css";
import CreateBookingModal from "../components/CreateBookingModal/CreateBookingModal.tsx";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {useAuth} from "../hooks/useAuth.ts";
import {useEffect, useState} from "react";
import {DocumentData, collection, getDocs, query, where} from "firebase/firestore";
import {firestoreDb} from "../firebase-config.ts";
import {Booking} from "../types/booking";
import FilterRow from "../components/FilterRow/FilterRow.tsx";
import {setBookings} from "../redux/slices/bookingsSlice.ts";
import {filterBookings} from "../utils/filters.ts";

const BOOKINGS_PER_PAGE = 3;

function UserPage() {
    const dispatch = useAppDispatch();
    const isModalOpen = useAppSelector(state => state.bookModal.isOpen);
    const {isAuth, uid} = useAuth();
    const bookings = useAppSelector(state => state.bookings.bookings);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const bookingRef = query(collection(firestoreDb, "bookings"), where("uid", "==", uid));

        async function getBookings() {
            const bookingsSnapshot = await getDocs(bookingRef);
            const bookingsList = bookingsSnapshot.docs.map((doc: DocumentData) => ({
                ...doc.data(),
                id: doc.id
            }));
            dispatch(setBookings(bookingsList));
        }

        getBookings();
    }, [isAuth, uid]);

    useEffect(() => {
        setFilteredBookings(bookings);
    }, [bookings]);

    const handleFilter = (filters: object) => {
        const filteredBookings = filterBookings(bookings, filters);
        setFilteredBookings(filteredBookings);
    }


    const toggleModal = () => {
        dispatch(toggleBookModal());
    };

    const indexOfLastBooking = currentPage * BOOKINGS_PER_PAGE;
    const indexOfFirstBooking = indexOfLastBooking - BOOKINGS_PER_PAGE;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

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
                <FilterRow onFilter={handleFilter}/>
                <div className={styles.bookingsWrapper}>
                    {
                        filteredBookings.length > 0 &&
                        <div className={styles.bookingsHeader}>
                            <div className={styles.bookingsHeaderCell}>
                                <p>Created at</p>
                            </div>
                            <div className={styles.bookingsHeaderCell}>
                                <p>Reserved Date</p>
                            </div>
                            <div className={styles.bookingsHeaderCell}>
                                <p>Type of session</p>
                            </div>
                            <div className={styles.bookingsHeaderCell}>
                                <p>Estimated Price</p>
                            </div>
                            <div className={styles.bookingsHeaderCell}>
                            </div>
                        </div>
                    }
                    {currentBookings.map((booking: Booking) => (
                        <BookingRow booking={booking}
                                    key={booking.id}/>
                    ))}
                    {filteredBookings.length === 0 && <h3 className={styles.noBookingsLabel}>No bookings yet :(</h3>}
                </div>
                <div className={styles.pagesButtonsWrapper}>
                    <button
                        className={styles.pagesButton}
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        {"<"}
                    </button>
                    {Array.from({length: Math.ceil(bookings.length / BOOKINGS_PER_PAGE)}).map(
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
                        disabled={currentPage === Math.ceil(bookings.length / BOOKINGS_PER_PAGE)}
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
import styles from "./pagesStyles/UserPage.module.css";
import {useAuth} from "../hooks/useAuth.ts";
import {useEffect, useState} from "react";
import {DocumentData, collection, getDocs} from "firebase/firestore";
import {firestoreDb} from "../firebase-config.ts";
import {Booking} from "../types/booking";
import BookingRowAdmin from "../components/BookingRow/BookingRowAdmin.tsx";
import {useAppDispatch} from "../hooks/useAppDispatch.ts";
import {toggleApproveModal, toggleRejectModal} from "../redux/slices/adminModalSlice.ts";
import FilterRow from "../components/FilterRow/FilterRow.tsx";
import {filterBookings} from "../utils/filters.ts";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {setBookings} from "../redux/slices/bookingsSlice.ts";


const BOOKINGS_PER_PAGE = 3;

function AdminPage() {
    const dispatch = useAppDispatch();

    const {isAuth} = useAuth();
    const bookings = useAppSelector(state => state.bookings.bookings);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

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
            dispatch(setBookings(bookingsList));
        }

        getBookings();
    }, [isAuth]);

    useEffect(() => {
        setFilteredBookings(bookings);
    }, [bookings]);

    const indexOfLastBooking = currentPage * BOOKINGS_PER_PAGE;
    const indexOfFirstBooking = indexOfLastBooking - BOOKINGS_PER_PAGE;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleFilter = (filters: object) => {
        const filteredBookings = filterBookings(bookings, filters);
        setFilteredBookings(filteredBookings);
    }

    return (
        <>
            <div className={styles.userPageWrapper}>
                <div className={styles.userPageHeader}>
                    <h2 className={styles.userPageHeaderTitle}>Admin page</h2>
                </div>
                <FilterRow onFilter={handleFilter}/>
                <div className={styles.bookingsWrapper}>
                    {
                        bookings.length > 0 &&
                        <div className={styles.bookingsHeader}>
                            <div className={styles.bookingsHeaderCell}>
                                <p>Created at</p>
                            </div>
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
                    {currentBookings.map((booking: Booking) => (
                        <BookingRowAdmin booking={booking}
                                         key={booking.id}
                                         selectedBooking={selectedBooking}
                                         onApproveClick={() => handleApproveClick(booking)}
                                         onRejectClick={() => handleRejectClick(booking)}/>
                    ))}
                    {bookings.length === 0 &&
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
        </>

    );
}

export default AdminPage;
import CreateBookingForm from "../CreateBookingForm/CreateBookingForm.tsx";
import styles from "./CreateBookingModal.module.css";
import React from "react";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {toggleBookModal} from "../../redux/slices/bookModalSlice.ts";

function CreateBookingModal() {
    const dispatch = useAppDispatch();

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            dispatch(toggleBookModal());
        }
    }

    return (
        <div className={styles.modalWrapper} onMouseDown={handleModalClick}>
            <div className={styles.modalContent}>
                <h1 className={styles.modalTitle}>Book a session</h1>
                <CreateBookingForm/>
            </div>
        </div>
    );
}

export default CreateBookingModal;
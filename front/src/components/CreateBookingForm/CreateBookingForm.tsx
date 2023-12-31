import {ErrorMessage, Field, Form, Formik} from "formik";
import styles from "./CreateBookingForm.module.css";
import {addDoc, collection} from "firebase/firestore";
import {firestoreDb} from "../../firebase-config.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import {createBookingSchema} from "../../schemas";
import { useAppDispatch } from "../../hooks/useAppDispatch.ts";
import {toggleBookModal} from "../../redux/slices/bookModalSlice.ts";
import {Booking} from "../../types/booking";
import {calculatePrice} from "../../utils/calculatePrice.ts";

interface ICreateBookingFormValues {
    selectedDate: string;
    selectedTime: string;
    selectedType: string;
    duration: number;
    amount: number;
    details: string;
}


function CreateBookingForm() {
    const dispatch = useAppDispatch();
    // const [error, setError] = useState("");
    const {uid} = useAuth();

    const initialValues: ICreateBookingFormValues = {
        selectedDate: "",
        selectedTime: "",
        selectedType: "",
        duration: 1,
        amount: 1,
        details: ""
    }

    const handleSubmit = async (values: ICreateBookingFormValues) => {
        try {
            const bookingData: Booking = {
                id: "",
                uid: uid,
                selectedDate: values.selectedDate,
                selectedTime: values.selectedTime,
                selectedType: values.selectedType,
                duration: values.duration,
                amount: values.amount,
                details: values.details,
                price: calculatePrice(values.selectedType, values.duration, values.amount),
                status: "pending"
            }

            const bookingsCollectionRef = collection(firestoreDb, "bookings");
            await addDoc(bookingsCollectionRef, bookingData);
            dispatch(toggleBookModal());
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={createBookingSchema}>
            <Form className={styles.bookForm}>
                <div className={styles.selectDateWrapper}>
                    <div className={styles.selectWrapper}>
                        <label className={styles.selectLabel} htmlFor="selectedDate">Date *</label>
                        <Field className={styles.selectDateField} id="selectedDate" name="selectedDate" type="date"/>
                        <ErrorMessage className={styles.inputError} name={"selectedDate"} component={"div"}/>
                    </div>
                    <div className={styles.selectWrapper}>
                        <label className={styles.selectLabel} htmlFor="selectedTime">Time *</label>
                        <Field className={styles.selectDateField} id="selectedTime" name="selectedTime" type={"time"}/>
                        <ErrorMessage className={styles.inputError} name={"selectedTime"} component={"div"}/>
                    </div>
                </div>

                <div className={styles.selectWrapper}>
                    <label className={styles.selectLabel} htmlFor="selectedType">Type *</label>
                    <Field className={styles.selectField} id="selectedType" name="selectedType" as={"select"}>
                        <option value={""}>Select a type</option>
                        <option value={"Couple"}>Couple photography</option>
                        <option value={"Family"}>Family photography</option>
                        <option value={"Event"}>Event photography</option>
                        <option value={"Wedding"}>Wedding photography</option>
                        <option value={"Portrait"}>Portrait photography</option>
                    </Field>
                    <ErrorMessage className={styles.inputError} name={"selectedType"} component={"div"}/>
                </div>

                <div className={styles.selectDateWrapper}>
                    <div className={styles.inputWrapper}>
                        <label className={styles.inputLabel} htmlFor="duration">Duration (hours) *</label>
                        <Field className={styles.inputField} id="duration" name="duration" type="number"/>
                        <ErrorMessage className={styles.inputError} name={"duration"} component={"div"}/>
                    </div>

                    <div className={styles.inputWrapper}>
                        <label className={styles.inputLabel} htmlFor="amount">Amount of people *</label>
                        <Field className={styles.inputField} id="amount" name="amount" type="number"/>
                        <ErrorMessage className={styles.inputError} name={"amount"} component={"div"}/>
                    </div>
                </div>

                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor="details">Details</label>
                    <Field as={"textarea"} className={styles.inputDetailsField} id="details" name="details"
                           type="text"/>
                    <ErrorMessage className={styles.inputError} name={"details"} component={"div"}/>
                </div>
                <button className={styles.submitButton} type={"submit"}>Book</button>
                <ErrorMessage className={styles.inputError} name={"details"} component={"div"}/>


            </Form>
        </Formik>
    );
}

export default CreateBookingForm;
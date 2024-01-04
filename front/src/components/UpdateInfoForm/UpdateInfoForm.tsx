import styles from './UpdateInfoForm.module.css';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {updateInfoSchema} from "../../schemas";
import {useAuth} from '../../hooks/useAuth';
import {
    EmailAuthProvider,
    getAuth,
    reauthenticateWithCredential,
    updatePassword,
    verifyBeforeUpdateEmail
} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import {doc, updateDoc} from 'firebase/firestore';
import {firestoreDb} from '../../firebase-config';

interface IUpdateInfoFormValues {
    fullname: string;
    phone: string;
    email: string;
    password: string;
    newPassword: string;
}


function UpdateInfoForm() {
    const auth = getAuth();
    const user = auth.currentUser;
    const {fullname, phone, email, uid} = useAuth();
    const navigate = useNavigate();

    const initialValues: IUpdateInfoFormValues = {
        fullname: fullname,
        phone: phone,
        email: email,
        password: "",
        newPassword: ""
    }

    const handleSubmit = async (values: IUpdateInfoFormValues) => {

        try {
            if (values.fullname !== fullname && values.fullname) {
                await updateDoc(doc(firestoreDb, "users", uid), {fullname: values.fullname});
            }

            if (values.phone !== phone && values.phone) {
                await updateDoc(doc(firestoreDb, "users", uid), {phone: values.phone});
            }

            if (user) {
                if (email !== values.email && values.email) {
                    const credential = EmailAuthProvider.credential(
                        email,
                        values.password
                    );
                    await reauthenticateWithCredential(user, credential);
                    // navigate('/login');
                    await verifyBeforeUpdateEmail(user, values.email);
                    await updateDoc(doc(firestoreDb, "users", uid), {email: values.email});
                    await auth.signOut();
                }

                if (values.newPassword) {
                    const credential = EmailAuthProvider.credential(
                        email,
                        values.password
                    );
                    await reauthenticateWithCredential(user, credential);
                    await updatePassword(user, values.newPassword);
                    navigate('/login');
                    await auth.signOut();
                }
            }
        } catch (e: unknown) {
            console.log(e);
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={updateInfoSchema} onSubmit={handleSubmit}>
            <Form className={styles.updateInfoForm}>
                <div className={styles.inputWrapper}>
                    <label htmlFor="fullname" className={styles.inputLabel}>Full name</label>
                    <Field className={styles.inputField} name="fullname" type="text" placeholder={fullname}/>
                    <ErrorMessage name="fullname" component="div" className={styles.inputError}/>
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor="phone">Phone</label>
                    <Field className={styles.inputField} name="phone" type="text" placeholder={phone}/>
                    <ErrorMessage className={styles.inputError} name="phone" component="div"/>
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor="email">Email</label>
                    <Field className={styles.inputField} name="email" type="text" placeholder={email}/>
                    <ErrorMessage className={styles.inputError} name="email" component="div"/>
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor="password">Current password</label>
                    <Field className={styles.inputField} name="password" type="password"/>
                    <ErrorMessage className={styles.inputError} name="password" component="div"/>
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor="password">New password</label>
                    <Field className={styles.inputField} name="newPassword" type="password"/>
                    <ErrorMessage className={styles.inputError} name="newPassword" component="div"/>
                </div>
                <button className={styles.submit} type="submit">Update</button>
            </Form>
        </Formik>
    );
}

export default UpdateInfoForm;
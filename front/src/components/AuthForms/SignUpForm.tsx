import {Formik, Form, Field, ErrorMessage} from "formik";
import {signUpSchema} from "../../schemas";
import styles from "./SignUpForm.module.css";
import {setUser} from "../../redux/slices/userSlice.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {getAuth, createUserWithEmailAndPassword, UserCredential, sendEmailVerification} from "firebase/auth";
import {setDoc, doc} from "firebase/firestore";
import {firestoreDb} from "../../firebase-config.ts";
import {useState} from "react";
import {FirebaseError} from "@firebase/util";

interface ISignUpFormValues {
    fullname: string;
    phone: string;
    email: string;
    password: string;
    acceptTerms?: boolean;
}

function SignUpForm() {
    const dispatch = useAppDispatch();
    const [error, setError] = useState("");

    const initialValues: ISignUpFormValues = {
        fullname: "",
        phone: "",
        email: "",
        password: "",
        acceptTerms: false
    }

    const handleSubmit = async (values: ISignUpFormValues) => {
        const auth = getAuth();
        try {
            const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;

            await sendEmailVerification(user);

            const userData = {
                uid: user.uid,
                fullname: values.fullname,
                phone: values.phone,
                email: values.email,
                isAdmin: false
            }
            await setDoc(doc(firestoreDb, "users", user.uid), userData);
            dispatch(setUser(userData));

        } catch (e: unknown) {
            if (e instanceof FirebaseError) {
                switch (e.code) {
                    case 'auth/email-already-in-use':
                        setError('Email already in use');
                        break;
                    case 'auth/too-many-requests':
                        setError('Many failed sign up attempts. Please try again later');
                        break;
                    case 'auth/missing-password':
                        setError('Missing password');
                        break;
                    default:
                        setError('An error occurred while signing up');
                        break;
                }
            }
        }
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={signUpSchema}
            onSubmit={handleSubmit}
        >
            <Form className={styles.signUpForm}>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor="fullname">Full Name</label>
                    <Field className={styles.inputField} id="fullname" name="fullname" type="text" placeholder="Zubenko Mikhail"/>
                    <ErrorMessage className={styles.inputError} name="fullname" component="div"/>
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor="phone">Phone Number</label>
                    <Field className={styles.inputField} id="phone" name="phone" type="text" placeholder="+380857570615"/>
                    <ErrorMessage className={styles.inputError} name="phone" component="div"/>
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor="email">Email</label>
                    <Field className={styles.inputField} id="email" name="email" type="text" placeholder="example@gmail.com"/>
                    <ErrorMessage className={styles.inputError} name="email" component="div"/>
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor="Password">Password</label>
                    <Field className={styles.inputField} id="password" name="password" type="password"/>
                    <ErrorMessage className={styles.inputError} name="password" component="div"/>
                </div>

                <div className={styles.checkboxWrapper}>

                    <div style={{"marginBottom": "30px"}}>
                        <Field
                            className={styles.inputCheckbox}
                            id="acceptTerms"
                            name="acceptTerms"
                            type="checkbox"
                        />
                        <label htmlFor="acceptTerms" className={styles.checkboxLabel}>
                            I accept all the agreements and I'm not a student of KPI
                        </label>
                    </div>
                    <ErrorMessage className={styles.inputError} name="acceptTerms" component="div"/>
                </div>

                <button className={styles.submit} type="submit">Create an account</button>
                {error && <div className={styles.error}>{error}</div>}
            </Form>
        </Formik>
    )
}

export default SignUpForm;
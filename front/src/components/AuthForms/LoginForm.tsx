import {Formik, Form, Field, ErrorMessage} from "formik";
import {signInSchema} from "../../schemas";
import styles from "./SignUpForm.module.css";
import {getAuth, signInWithEmailAndPassword, UserCredential} from "firebase/auth";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {doc, getDoc} from "firebase/firestore";
import {firestoreDb} from "../../firebase-config.ts";
import {setUser} from "../../redux/slices/userSlice.ts";
import {FirebaseError} from "@firebase/util";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface ILoginFormValues {
    email: string;
    password: string;
}

function LoginForm() {
    const dispatch = useAppDispatch();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const initialValues: ILoginFormValues = {
        email: "",
        password: ""
    }

    const handleSubmit = async (values: ILoginFormValues) => {
        const auth = getAuth();
        try {
            const userCredential: UserCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;

            const userDocRef = doc(firestoreDb, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                dispatch(setUser(userData))
                userData.isAdmin ? navigate('/admin') : navigate('/userPage')
            } else {
                setError("No such user");
            }
        } catch (e: unknown) {
            if (e instanceof FirebaseError) {
                switch (e.code) {
                    case 'auth/invalid-credential':
                        setError('Invalid email or password');
                        break;
                    case 'auth/invalid-email':
                        setError('Invalid email');
                        break;
                    case 'auth/missing-password':
                        setError('Missing password');
                        break;
                    case 'auth/too-many-requests':
                        setError('Many failed login attempts. Please try again later');
                        break;
                    default:
                        setError('An error occurred while logging in');
                        break;
                }
            }
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={signInSchema}
            onSubmit={handleSubmit
            }
        >
            <Form>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor="email">Email</label>
                    <Field className={styles.inputField} id="email" name="email" type="text"/>
                    <ErrorMessage className={styles.inputError} name="email" component="div"/>
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor="password">Password</label>
                    <Field className={styles.inputField} id="password" name="password" type="password"/>
                    <ErrorMessage className={styles.inputError} name="password" component="div"/>
                </div>
                <button className={styles.submit} type="submit">Log In</button>
                {error && <div className={styles.error}>{error}</div>}

            </Form>
        </Formik>
    )
}

export default LoginForm;
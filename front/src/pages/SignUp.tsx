import {Link, useNavigate} from "react-router-dom";
import SignUpForm from "../components/AuthForms/SignUpForm.tsx";
import styles from "./pagesStyles/SignUp.module.css";
import {useAuth} from "../hooks/useAuth.ts";

function SignUp() {
    const {isAuth} = useAuth();
    const navigate = useNavigate();

    if (isAuth) {
        navigate('/')
    }

    return (
        <div className={styles.signUpWrapper}>
            <div>
                <img src="/images/Illustration.png"/>
            </div>
            <div className={styles.signUpFormWrapper}>
                <div className={styles.signUpFormHeader}>
                    <h2 className={styles.signUpFormTitle}>Create an account</h2>
                    <Link className={styles.signUpFormLink} to="/login">Log in instead</Link>
                </div>
                <SignUpForm/>
                {/*<div className={styles.separator}>*/}
                {/*    <hr className={styles.separatorLine}/>*/}
                {/*    <span className={styles.separatorText}>OR</span>*/}
                {/*    <hr className={styles.separatorLine}/>*/}
                {/*</div>*/}
                {/*<button className={styles.googleAuth} type="submit">*/}
                {/*    <img className={styles.googleAuthImg} src="/images/google.svg" alt="google"/>*/}
                {/*    <span className={styles.googleAuthText}>Continue with Google</span>*/}
                {/*</button>*/}
            </div>
        </div>
    );
}

export default SignUp;
import styles from "./pagesStyles/Login.module.css";
import LoginForm from "../components/AuthForms/LoginForm.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";

function Login() {
    const {isAuth} = useAuth();
    const navigate = useNavigate();

    if (isAuth) {
        navigate('/')
    }

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginContent}>
                <h3 className={styles.loginTitle}>Log In</h3>
                <p className={styles.loginSubtitle}>Don't have an accout? <Link className={styles.loginLink}
                                                                             to="/signup">Sign Up</Link></p>
                <LoginForm/>
            </div>
        </div>
    )
}

export default Login;
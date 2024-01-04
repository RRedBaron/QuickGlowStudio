import styles from './pagesStyles/UserSettings.module.css';
import {useAuth} from "../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";
import UpdateInfoForm from "../components/UpdateInfoForm/UpdateInfoForm.tsx";

function UserSettings() {
    const {isAuth} = useAuth();
    const navigate = useNavigate();

    if (!isAuth) {

        navigate('/login');
    }

    return (
        <div className={styles.userSettings}>
            <h1 className={styles.title}>User Settings</h1>
            <UpdateInfoForm/>
        </div>
    );
}

export default UserSettings;
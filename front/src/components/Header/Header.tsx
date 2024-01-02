import styles from "./Header.module.css";
import {useAuth} from "../../hooks/useAuth.ts";
import {Link, useLocation} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase-config.ts";
import {removeUser} from "../../redux/slices/userSlice.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";

function Header() {
    const {isAuth, isAdmin, fullname} = useAuth();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const handleSignOut = () => {
        signOut(auth).then(() => {
            dispatch(removeUser());
        });
    };

    const color = {"color": location.pathname !== "/" ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)"}

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}
                 style={location.pathname !== "/" ? {"backgroundColor": "rgb(255, 255, 255)"} : {}}>
                <Link className={styles.headerLogo} to={"/"}>
                    <img src="/images/logo.png"></img>
                </Link>
                <ul className={styles.headerList}>
                    <li className={styles.headerListItem} style={color}>EN |</li>
                    {!isAuth ? (<>
                        <li className={styles.headerListItem} style={color}>
                            <span>Locations</span>
                            <div className={styles.headerListItemContent}>
                                <div className={styles.headerListItemContentItem}>
                                    <p>Kyiv, 123 Azure Street</p>
                                </div>
                            </div>
                        </li>
                        <li className={styles.headerListItem} style={color}>
                            <span>Contacts</span>
                            <div className={styles.headerListItemContent}>
                                <div className={styles.headerListItemContentItem}>
                                    <img src="/images/kyivstar.svg"/>
                                    <p>+38 (096) 123-4567</p>
                                </div>
                                <div className={styles.headerListItemContentItem}>
                                    <img src="/images/vodafone.svg"/>
                                    <p>+38 (066) 765-4321</p>
                                </div>
                            </div>
                        </li>
                        <li className={styles.headerListItem} style={color}>
                            <Link className={styles.headerListLink} to="/login">Log In</Link>
                        </li>
                    </>) : (<li className={styles.headerListItem} style={color}>
                        <Link style={color} to={isAdmin ? "/admin" : "/userpage"} className={styles.headerUserWrapper}>
                            <span className={styles.headerNickname}>{fullname}</span>
                            <div className={styles.headerImgWrapper}>
                                <img src={"/images/avatar.jpg"}/>
                            </div>
                        </Link>
                        <Link className={styles.headerListLink} to={"/login"} onClick={handleSignOut}>Log Out</Link>
                    </li>)
                    }
                </ul>

            </div>
        </header>
    );
}

export default Header;
import './App.css'
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import {useAppDispatch} from './hooks/useAppDispatch.ts';
import {useEffect} from "react";
import {auth, firestoreDb} from "./firebase-config.ts";
import {removeUser, setUser} from "./redux/slices/userSlice.ts";
import {doc, onSnapshot} from 'firebase/firestore';
import UserPage from "./pages/UserPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";

function App() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("User is logged in")
                const userRef = doc(firestoreDb, "users", user.uid);
                onSnapshot(userRef, (doc) => {
                    if (doc.exists()) {
                        const userData = doc.data();

                        dispatch(setUser({
                            uid: user.uid,
                            fullname: userData.fullname,
                            phone: userData.phone,
                            email: userData.email,
                            isAdmin: userData.isAdmin
                        }));
                    } else {
                        console.log("User not found");
                    }
                });
            } else {
                dispatch(removeUser());
            }
        });
        return () => {
            unsubscribe()
        };
    }, [dispatch]);

    return (
        <>
            <Header/>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/signup"} element={<SignUp/>}/>
                <Route path={"/userPage"} element={<UserPage/>}/>
                <Route path={"/admin"} element={<AdminPage/>}/>
                <Route path={"*"} element={<NotFound/>}/>
            </Routes>

            <Footer/>
        </>
    )
}

export default App

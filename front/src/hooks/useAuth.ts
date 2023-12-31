import {useAppSelector} from "./useAppSelector.ts";

export function useAuth() {
    const { uid, email, isAdmin, phone, fullname } = useAppSelector(state => state.user)
    return {
        isAuth: !!email,
        uid,
        email,
        isAdmin,
        phone,
        fullname
    }
}
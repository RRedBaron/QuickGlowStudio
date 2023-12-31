import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { useDispatch } from "react-redux";
import {AppDispatch} from "../redux/store.ts";

export const useAppDispatch: () => AppDispatch = useDispatch;

import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../store/authSlice";
import router from "../store/router"
import hotels_item from "./HotelItem";
import search from "./Search";
import dataBooking from "./dataBooking";

export default configureStore({
        reducer: {
            auth: authReducer,
            router: router,
            search: search,
            hotels_item: hotels_item,
            dataBooking: dataBooking,
        }
    }
)
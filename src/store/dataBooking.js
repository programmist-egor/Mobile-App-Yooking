import { createSlice } from '@reduxjs/toolkit';


const dataBooking = createSlice({
    name: 'dataBooking',
    initialState: {
        dataBooking: null,
        updateNumber: null,
        updateUser: null,
        numberId: null,
        userId: null,
        searchUsers: "",
        filterData: [],
        bookingData: [],
        dataObjects: [],
        dataRange: {checkIn: "", checkOut: "", month: "", countNight: 6},
        checkInDate: "",
        checkOutDate: "",
        loadingItemUser: false,
    },
    reducers: {
        setDataBookingHandler(state, action) {
            const {numberId, dataBooking, updateNumber, userId, updateUser} = action.payload
            state.dataBooking = dataBooking
            state.updateNumber = updateNumber
            state.updateUser = updateUser
            state.numberId = numberId
            state.userId = userId
        },
        searchUsersHandler(state, action) {
            state.searchUsers = action.payload
        },
        setFilterDataUsersHandler(state, action) {
            state.filterData = action.payload
        },
        setBookingDataHandler(state, action) {
            state.bookingData = action.payload
        },
        setDataObjectHandler(state, action) {
            state.dataObjects = action.payload
        },
        handlerDataRange(state, action) {
            state.dataRange = action.payload
        },
        checkOutDateHandler(state, action) {
            state.checkOutDate = action.payload
        },
        checkInDateHandler(state, action) {
            state.checkInDate = action.payload
        },
        loadingItemUserHandler(state, action) {
            state.loadingItemUser = action.payload
        },
    },

});
export const {
    setDataBookingHandler,
    searchUsersHandler,
    setBookingDataHandler,
    setDataObjectHandler,
    handlerDataRange,
    checkOutDateHandler,
    checkInDateHandler,
    loadingItemUserHandler,
    setFilterDataUsersHandler,
} = dataBooking.actions
export default dataBooking.reducer;



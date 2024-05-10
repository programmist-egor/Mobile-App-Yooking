import { createSlice } from '@reduxjs/toolkit';

const router = createSlice({
    name: 'router',
    initialState:{
        activeTab: "Поиск"
    },
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload
        }
    }
})

export const {
    setActiveTab,
} = router.actions;

export default router.reducer;
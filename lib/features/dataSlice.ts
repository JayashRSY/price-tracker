import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface dataSlice {
    recentData: any;
    filteredPrices: any
    selectedStock: any
}

const initialState: dataSlice = {
    recentData: [],
    filteredPrices: [],
    selectedStock: ""
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setRecentData: (state, action: PayloadAction<any>) => {
            state.recentData = action.payload;
        },
        setFilteredPrices: (state, action: PayloadAction<any>) => {
            state.filteredPrices = action.payload;
        },
        setSelectedStock: (state, action: PayloadAction<any>) => {
            state.selectedStock = action.payload;
        },
    },
});

export const { setRecentData, setFilteredPrices, setSelectedStock } = dataSlice.actions;
export default dataSlice.reducer;
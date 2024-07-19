'use client';

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';

interface StockState {
    data: any[];
    selectedStock: string;
}

const initialState: StockState = {
    data: [],
    selectedStock: 'bitcoin',
};

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<any[]>) => {
            state.data = action.payload;
        },
        setSelectedStock: (state, action: PayloadAction<string>) => {
            state.selectedStock = action.payload;
        },
    },
});

export const { setData, setSelectedStock } = stockSlice.actions;

const store = configureStore({
    reducer: {
        stock: stockSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

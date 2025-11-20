import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StoreState {
    listStore: any[];
    storeActive: any;
    storeLastUsed: any;
    optionDryCleaning: any[];
    listDryCleaning: any[];
    geolocation: any;
    storeSelectedMap: any;
    storeLast: any;
    socialType: string;
    listStoreMap: any[];
    timeOrder: string;
    orderType: string;
}

const initialState: StoreState = {
    listStore: [],
    storeActive: {},
    storeLastUsed: {},
    optionDryCleaning: [],
    listDryCleaning: [],
    geolocation: null,
    storeSelectedMap: null,
    storeLast: null,
    socialType: '',
    listStoreMap: [],
    timeOrder: '',
    orderType: ''
};

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        setListStore: (state, action: PayloadAction<any[]>) => {
            state.listStore = action.payload;
        },
        setListStoreMap: (state, action: PayloadAction<any[]>) => {
            state.listStoreMap = action.payload;
        },
        setStoreActive: (state, action: PayloadAction<any>) => {
            state.storeActive = action.payload;
        },
        setStoreLastUsed: (state, action: PayloadAction<any[]>) => {
            state.storeLastUsed = action.payload;
        },
        setStoreSelectedMap: (state, action: PayloadAction<any>) => {
            state.storeSelectedMap = action.payload;
        },
        setOptionDryCleaning: (state, action: PayloadAction<any[]>) => {
            state.optionDryCleaning = action.payload;
        },
        setListDryCleaning: (state, action: PayloadAction<any[]>) => {
            state.listDryCleaning = action.payload;
        },
        setGeolocation: (state, action) => {
            state.geolocation = action.payload;
        },
        setStoreLast: (state, action) => {
            state.storeLast = action.payload;
        },
        setSocialType: (state, action) => {
            state.socialType = action.payload;
        },
        setTimeOrder: (state, action: PayloadAction<string>) => {
            state.timeOrder = action.payload;
        },
        setOrderType: (state, action: PayloadAction<any>) => {
            state.orderType = action.payload;
        },
    },
});

export const { setListStore, setListStoreMap, setStoreActive, setStoreLastUsed, setStoreSelectedMap, setOptionDryCleaning, setListDryCleaning, setGeolocation, setStoreLast, setSocialType, setTimeOrder, setOrderType } = storeSlice.actions;
export default storeSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  isLoading: boolean;
  profile: any;
  processedPaymentId: string;
}

const initialState: GlobalState = {
  isLoading: false,
  profile: {},
  processedPaymentId: ''
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProfile: (state, action: PayloadAction<boolean>) => {
      state.profile = action.payload;
    },
    setProcessedPaymentId: (state, action: PayloadAction<string>) => {
      state.processedPaymentId = action.payload;
    },
    resetProcessedPaymentId: (state) => {
      state.processedPaymentId = '';
    },
  },
});

export const { setLoading, setProfile, setProcessedPaymentId, resetProcessedPaymentId } = globalSlice.actions;

export const isLoadingSelecter = (state: any) => state.global.isLoading;
export const processedPaymentIdSelector = (state: any) => state.global.processedPaymentId;

export default globalSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface NoticesState {
  isOpen: boolean;
  listNotice: any;
}

const initialState: NoticesState = {
  isOpen: false,
  listNotice: {}
};

const noticesSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {
    openNotices: (state) => {
      state.isOpen = true;
    },
    closeNotices: (state) => {
      state.isOpen = false;
    },
    setListNotice: (state, action: PayloadAction<any>) => {
      state.listNotice = action.payload;
    },
  },
});

export const { openNotices, closeNotices, setListNotice } = noticesSlice.actions;

export const isOpenNoticesSelecter = (state: RootState) => state.notices.isOpen;

export default noticesSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Page } from "@/types/domain";

type DraftPageState = {
  page: Page | null;
  isDirty: boolean;
};

const initialState: DraftPageState = {
  page: null,
  isDirty: false,
};

export const draftPageSlice = createSlice({
  name: "draftPage",
  initialState,
  reducers: {
    setDraftPage(state, action: PayloadAction<Page>) {
      state.page = action.payload;
      state.isDirty = false;
    },
    markDraftDirty(state) {
      state.isDirty = true;
    },
    clearDraftPage() {
      return initialState;
    },
  },
});

export const { setDraftPage, markDraftDirty, clearDraftPage } = draftPageSlice.actions;
export const draftPageReducer = draftPageSlice.reducer;

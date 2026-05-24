import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  activePanel: "sections" | "settings" | null;
  isSaving: boolean;
};

const initialState: UiState = {
  activePanel: null,
  isSaving: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActivePanel(state, action: PayloadAction<UiState["activePanel"]>) {
      state.activePanel = action.payload;
    },
    setIsSaving(state, action: PayloadAction<boolean>) {
      state.isSaving = action.payload;
    },
  },
});

export const { setActivePanel, setIsSaving } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;

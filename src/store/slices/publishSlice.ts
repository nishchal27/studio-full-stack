import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type PublishStatus = "idle" | "preparing" | "publishing" | "success" | "error";

type PublishState = {
  status: PublishStatus;
  pendingVersion: string | null;
  errorMessage: string | null;
};

const initialState: PublishState = {
  status: "idle",
  pendingVersion: null,
  errorMessage: null,
};

export const publishSlice = createSlice({
  name: "publish",
  initialState,
  reducers: {
    setPublishStatus(state, action: PayloadAction<PublishStatus>) {
      state.status = action.payload;
    },
    setPendingVersion(state, action: PayloadAction<string | null>) {
      state.pendingVersion = action.payload;
    },
    setPublishError(state, action: PayloadAction<string>) {
      state.status = "error";
      state.errorMessage = action.payload;
    },
    resetPublishState() {
      return initialState;
    },
  },
});

export const { setPublishStatus, setPendingVersion, setPublishError, resetPublishState } =
  publishSlice.actions;
export const publishReducer = publishSlice.reducer;

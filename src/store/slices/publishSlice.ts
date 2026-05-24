import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type PublishStatus = "idle" | "preparing" | "publishing" | "success" | "error";

type PublishState = {
  status: PublishStatus;
  pendingVersion: string | null;
  latestVersion: string | null;
  changelog: string[];
  errorMessage: string | null;
};

const initialState: PublishState = {
  status: "idle",
  pendingVersion: null,
  latestVersion: null,
  changelog: [],
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
    setPublishSuccess(
      state,
      action: PayloadAction<{
        version: string;
        changelog: string[];
      }>,
    ) {
      state.status = "success";
      state.latestVersion = action.payload.version;
      state.pendingVersion = null;
      state.changelog = action.payload.changelog;
      state.errorMessage = null;
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

export const {
  setPublishStatus,
  setPendingVersion,
  setPublishSuccess,
  setPublishError,
  resetPublishState,
} = publishSlice.actions;
export const publishReducer = publishSlice.reducer;

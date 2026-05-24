import { configureStore } from "@reduxjs/toolkit";

import { draftPageReducer } from "@/store/slices/draftPageSlice";
import { publishReducer } from "@/store/slices/publishSlice";
import { uiReducer } from "@/store/slices/uiSlice";

export const store = configureStore({
  reducer: {
    draftPage: draftPageReducer,
    ui: uiReducer,
    publish: publishReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

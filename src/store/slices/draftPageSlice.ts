import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RenderablePage, Section } from "@/types/domain";

type DraftPageState = {
  page: RenderablePage | null;
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
    setDraftPage(state, action: PayloadAction<RenderablePage>) {
      state.page = action.payload;
      state.isDirty = false;
    },
    updateSectionProp(
      state,
      action: PayloadAction<{
        sectionId: string;
        propName: string;
        value: string;
      }>,
    ) {
      const section = state.page?.sections.find(
        (candidate) => candidate.id === action.payload.sectionId,
      );

      if (!section || typeof section.props !== "object" || section.props === null) {
        return;
      }

      // Redux is the only owner of draft mutations. Components dispatch field intent;
      // reducers apply the controlled state transition.
      section.props = {
        ...section.props,
        [action.payload.propName]: action.payload.value,
      };
      state.isDirty = true;
    },
    addSection(state, action: PayloadAction<Section>) {
      state.page?.sections.push(action.payload);
      state.isDirty = true;
    },
    reorderSection(
      state,
      action: PayloadAction<{
        sectionId: string;
        direction: "up" | "down";
      }>,
    ) {
      if (!state.page) {
        return;
      }

      const currentIndex = state.page.sections.findIndex(
        (section) => section.id === action.payload.sectionId,
      );
      const nextIndex = action.payload.direction === "up" ? currentIndex - 1 : currentIndex + 1;

      if (currentIndex < 0 || nextIndex < 0 || nextIndex >= state.page.sections.length) {
        return;
      }

      const [section] = state.page.sections.splice(currentIndex, 1);

      if (section) {
        state.page.sections.splice(nextIndex, 0, section);
        state.isDirty = true;
      }
    },
    removeSection(state, action: PayloadAction<{ sectionId: string }>) {
      if (!state.page) {
        return;
      }

      state.page.sections = state.page.sections.filter(
        (section) => section.id !== action.payload.sectionId,
      );
      state.isDirty = true;
    },
    markDraftDirty(state) {
      state.isDirty = true;
    },
    clearDraftPage() {
      return initialState;
    },
  },
});

export const {
  setDraftPage,
  updateSectionProp,
  addSection,
  reorderSection,
  removeSection,
  markDraftDirty,
  clearDraftPage,
} = draftPageSlice.actions;
export const draftPageReducer = draftPageSlice.reducer;

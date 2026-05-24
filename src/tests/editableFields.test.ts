import { describe, expect, it } from "vitest";

import { editableFields, getEditableFields } from "@/features/editor/config/editableFields";
import { sectionTypes } from "@/types/domain";

describe("editableFields", () => {
  it("defines editing boundaries for every supported section type", () => {
    expect(Object.keys(editableFields).sort()).toEqual([...sectionTypes].sort());
  });

  it("returns stable field paths for editor-owned mutations", () => {
    const heroFields = getEditableFields("hero");

    expect(heroFields.map((field) => field.path)).toContain("props.heading");
    expect(heroFields.every((field) => field.path.startsWith("props."))).toBe(true);
  });
});

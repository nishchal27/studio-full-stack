"use client";

import type { ChangeEvent } from "react";

import type { EditableFieldConfig } from "@/features/editor/config/editableFields";

type EditorFieldProps = {
  field: EditableFieldConfig;
  value: string;
  onChange: (value: string) => void;
};

export function EditorField({ field, value, onChange }: EditorFieldProps) {
  const inputId = `field-${field.path.replaceAll(".", "-")}`;
  const sharedClassName =
    "mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600";

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    onChange(event.target.value);
  }

  return (
    <div>
      <label className="text-sm font-medium text-slate-900" htmlFor={inputId}>
        {field.label}
      </label>
      {field.type === "textarea" ? (
        <textarea
          className={sharedClassName}
          id={inputId}
          onChange={handleChange}
          required={field.required}
          rows={3}
          value={value}
        />
      ) : (
        <input
          className={sharedClassName}
          id={inputId}
          onChange={handleChange}
          required={field.required}
          type={field.type === "url" ? "url" : "text"}
          value={value}
        />
      )}
    </div>
  );
}

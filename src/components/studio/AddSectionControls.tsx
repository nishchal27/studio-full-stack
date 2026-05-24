"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/shared/ui/button";
import { sectionTypes, type SectionType } from "@/types/domain";

type AddSectionControlsProps = {
  onAddSection: (sectionType: SectionType) => void;
};

export function AddSectionControls({ onAddSection }: AddSectionControlsProps) {
  return (
    <div aria-labelledby="add-section-title" className="border-t border-slate-200 pt-4">
      <h2 id="add-section-title" className="text-sm font-semibold text-slate-950">
        Add section
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {sectionTypes.map((sectionType) => (
          <Button key={sectionType} onClick={() => onAddSection(sectionType)} variant="secondary">
            <Plus aria-hidden="true" className="mr-2 h-4 w-4" />
            {sectionType}
          </Button>
        ))}
      </div>
    </div>
  );
}

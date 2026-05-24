"use client";

import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";

import { Button } from "@/components/shared/ui/button";

type SectionControlsProps = {
  canMoveDown: boolean;
  canMoveUp: boolean;
  onMoveDown: () => void;
  onMoveUp: () => void;
  onRemove: () => void;
};

export function SectionControls({
  canMoveDown,
  canMoveUp,
  onMoveDown,
  onMoveUp,
  onRemove,
}: SectionControlsProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Section controls">
      <Button
        aria-label="Move section up"
        disabled={!canMoveUp}
        onClick={onMoveUp}
        variant="secondary"
      >
        <ArrowUp aria-hidden="true" className="h-4 w-4" />
      </Button>
      <Button
        aria-label="Move section down"
        disabled={!canMoveDown}
        onClick={onMoveDown}
        variant="secondary"
      >
        <ArrowDown aria-hidden="true" className="h-4 w-4" />
      </Button>
      <Button aria-label="Remove section" onClick={onRemove} variant="secondary">
        <Trash2 aria-hidden="true" className="h-4 w-4" />
      </Button>
    </div>
  );
}

"use client";

import { useTransition } from "react";

import { Button } from "@/components/shared/ui/button";
import { publishDraftAction } from "@/features/publish/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPublishError, setPublishStatus, setPublishSuccess } from "@/store/slices/publishSlice";
import type { RenderablePage, UserRole } from "@/types/domain";

type PublishPanelProps = {
  draftPage: RenderablePage;
  role: UserRole;
};

export function PublishPanel({ draftPage, role }: PublishPanelProps) {
  const dispatch = useAppDispatch();
  const publishState = useAppSelector((state) => state.publish);
  const [isPending, startTransition] = useTransition();
  const canPublish = role === "publisher";

  function handlePublish() {
    dispatch(setPublishStatus("publishing"));

    startTransition(async () => {
      const result = await publishDraftAction(draftPage);

      if (!result.ok) {
        dispatch(setPublishError(result.message));
        return;
      }

      dispatch(
        setPublishSuccess({
          version: result.version,
          changelog: result.changelog,
        }),
      );
    });
  }

  return (
    <section
      aria-labelledby="publish-title"
      className="rounded-md border border-slate-200 bg-white p-4"
    >
      <h2 id="publish-title" className="text-sm font-semibold text-slate-950">
        Publish
      </h2>
      <p className="mt-2 text-sm text-slate-700">
        Releases are immutable snapshots created from the shared renderable page contract.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button disabled={!canPublish || isPending} onClick={handlePublish}>
          {isPending ? "Publishing" : "Publish draft"}
        </Button>
        {publishState.latestVersion ? (
          <p className="text-sm text-slate-700">Latest version: {publishState.latestVersion}</p>
        ) : null}
      </div>

      {!canPublish ? (
        <p className="mt-3 text-sm text-amber-900">
          Publisher role is required. UI state is informational; the server action enforces this
          permission.
        </p>
      ) : null}

      {publishState.status === "error" && publishState.errorMessage ? (
        <p className="mt-3 text-sm text-red-700">{publishState.errorMessage}</p>
      ) : null}

      {publishState.changelog.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-slate-950">Changelog</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {publishState.changelog.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { stableSerialize } from "@/lib/semver/stableSerialize";
import type { PublishSnapshot } from "@/types/domain";

export async function getLatestSnapshot(slug: string) {
  const snapshots = await listSnapshots(slug);

  return snapshots.at(-1) ?? null;
}

export async function writeSnapshot(snapshot: PublishSnapshot) {
  const releaseDir = path.join(getReleasesRoot(), snapshot.slug);
  const filePath = path.join(releaseDir, `${snapshot.version}.json`);

  await mkdir(releaseDir, { recursive: true });

  // Snapshot writes are intentionally one-way. If a version already exists, idempotency
  // should have returned it before this point instead of mutating historical release data.
  await writeFile(filePath, `${stableSerialize(snapshot)}\n`, { flag: "wx" });

  return filePath;
}

async function listSnapshots(slug: string): Promise<PublishSnapshot[]> {
  const releaseDir = path.join(getReleasesRoot(), slug);

  try {
    const files = (await readdir(releaseDir))
      .filter((file) => file.endsWith(".json"))
      .sort(compareVersionFiles);

    const snapshots = await Promise.all(
      files.map(async (file) => {
        const contents = await readFile(path.join(releaseDir, file), "utf8");
        return JSON.parse(contents) as PublishSnapshot;
      }),
    );

    return snapshots;
  } catch {
    return [];
  }
}

function getReleasesRoot() {
  return path.join(process.cwd(), "releases");
}

function compareVersionFiles(left: string, right: string) {
  const leftParts = left.replace(".json", "").split(".").map(Number);
  const rightParts = right.replace(".json", "").split(".").map(Number);

  for (let index = 0; index < 3; index += 1) {
    const diff = (leftParts[index] ?? 0) - (rightParts[index] ?? 0);

    if (diff !== 0) {
      return diff;
    }
  }

  return 0;
}

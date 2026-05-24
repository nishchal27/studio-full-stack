import type { VersionChange } from "@/lib/semver/compareSections";

export function generateVersion(previousVersion: string | null, change: VersionChange) {
  if (!previousVersion) {
    return "1.0.0";
  }

  const [major, minor, patch] = parseVersion(previousVersion);

  switch (change) {
    case "major":
      return `${major + 1}.0.0`;
    case "minor":
      return `${major}.${minor + 1}.0`;
    case "patch":
      return `${major}.${minor}.${patch + 1}`;
    case "none":
      return previousVersion;
  }
}

function parseVersion(version: string) {
  const [major = "0", minor = "0", patch = "0"] = version.split(".");

  return [Number(major), Number(minor), Number(patch)] as const;
}

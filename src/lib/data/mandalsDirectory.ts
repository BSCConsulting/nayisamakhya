import directory from "@/lib/data/mandals-directory.json";

export type MandalDirectoryEntry = {
  district_slug: string;
  slug: string;
  name_en: string;
  name_te: string;
  lgd_code: string;
};

/** Phase 2: full Telangana mandal directory (589). */
export const MANDALS_DIRECTORY = directory as MandalDirectoryEntry[];

if (MANDALS_DIRECTORY.length !== 589) {
  throw new Error(
    `Expected 589 Telangana mandals, got ${MANDALS_DIRECTORY.length}`,
  );
}

export function listMandalsDirectory(): MandalDirectoryEntry[] {
  return MANDALS_DIRECTORY;
}

export function listMandalsForDistrict(
  districtSlug: string,
): MandalDirectoryEntry[] {
  return MANDALS_DIRECTORY.filter((m) => m.district_slug === districtSlug);
}

export const OPPORTUNITY_TYPES = [
  { value: "scholarship", label: "Scholarships" },
  { value: "job", label: "Jobs" },
  { value: "grant", label: "Grants" },
  { value: "fellowship", label: "Fellowships" },
  { value: "internship", label: "Internships" },
  { value: "competition", label: "Competitions" },
  { value: "conference", label: "Conferences" },
  { value: "exchange", label: "Exchange Programs" },
  { value: "training", label: "Training Programs" },
  { value: "workshop", label: "Workshops" },
  { value: "volunteering", label: "Volunteering" },
  { value: "other", label: "Other" },
] as const;

export const LEVELS = [
  { value: "high-school", label: "High School" },
  { value: "undergraduate", label: "Undergraduate" },
  { value: "masters", label: "Masters" },
  { value: "phd", label: "PhD" },
  { value: "postdoc", label: "Postdoc" },
  { value: "professional", label: "Professional" },
  { value: "any", label: "Any Level" },
] as const;

export const REGIONS = [
  { value: "africa", label: "Africa" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "north-america", label: "North America" },
  { value: "south-america", label: "South America" },
  { value: "oceania", label: "Oceania" },
  { value: "middle-east", label: "Middle East" },
  { value: "global", label: "Global / Multiple Regions" },
] as const;

export const FUNDING_TYPES = [
  { value: "fully-funded", label: "Fully Funded" },
  { value: "partially-funded", label: "Partially Funded" },
  { value: "paid", label: "Paid" },
  { value: "unpaid", label: "Unpaid" },
  { value: "unspecified", label: "Unspecified" },
] as const;

export const STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
] as const;

export type OpportunityTypeValue = (typeof OPPORTUNITY_TYPES)[number]["value"];
export type LevelValue = (typeof LEVELS)[number]["value"];
export type RegionValue = (typeof REGIONS)[number]["value"];
export type FundingTypeValue = (typeof FUNDING_TYPES)[number]["value"];
export type StatusValue = (typeof STATUSES)[number]["value"];

function labelFrom<T extends { value: string; label: string }>(
  list: readonly T[],
  value: string | null | undefined,
): string {
  return list.find((item) => item.value === value)?.label ?? value ?? "";
}

export const opportunityTypeLabel = (value: string | null | undefined) =>
  labelFrom(OPPORTUNITY_TYPES, value);
export const levelLabel = (value: string | null | undefined) => labelFrom(LEVELS, value);
export const regionLabel = (value: string | null | undefined) => labelFrom(REGIONS, value);
export const fundingTypeLabel = (value: string | null | undefined) =>
  labelFrom(FUNDING_TYPES, value);

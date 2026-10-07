// One color per opportunity type, used for tags, icons, section headers and
// hover states so each category reads as its own area of the site. Classes
// are written out in full (not built from strings) so Tailwind can see them.
// Text shades are 700-800 on 50-100 tints to stay above 4.5:1 contrast.
export interface TypeTheme {
  badge: string;
  iconWrap: string;
  band: string;
  rule: string;
  seeMore: string;
  hoverBorder: string;
}

const themes: Record<string, TypeTheme> = {
  scholarship: {
    badge: "bg-emerald-100 text-emerald-800",
    iconWrap: "bg-emerald-100 text-emerald-700",
    band: "bg-emerald-50/60",
    rule: "bg-emerald-600",
    seeMore: "border-emerald-200 text-emerald-800 hover:bg-emerald-100",
    hoverBorder: "hover:border-emerald-400",
  },
  job: {
    badge: "bg-sky-100 text-sky-800",
    iconWrap: "bg-sky-100 text-sky-700",
    band: "bg-sky-50/60",
    rule: "bg-sky-600",
    seeMore: "border-sky-200 text-sky-800 hover:bg-sky-100",
    hoverBorder: "hover:border-sky-400",
  },
  grant: {
    badge: "bg-amber-100 text-amber-900",
    iconWrap: "bg-amber-100 text-amber-800",
    band: "bg-amber-50/60",
    rule: "bg-amber-500",
    seeMore: "border-amber-300 text-amber-900 hover:bg-amber-100",
    hoverBorder: "hover:border-amber-400",
  },
  fellowship: {
    badge: "bg-violet-100 text-violet-800",
    iconWrap: "bg-violet-100 text-violet-700",
    band: "bg-violet-50/60",
    rule: "bg-violet-600",
    seeMore: "border-violet-200 text-violet-800 hover:bg-violet-100",
    hoverBorder: "hover:border-violet-400",
  },
  internship: {
    badge: "bg-rose-100 text-rose-800",
    iconWrap: "bg-rose-100 text-rose-700",
    band: "bg-rose-50/60",
    rule: "bg-rose-600",
    seeMore: "border-rose-200 text-rose-800 hover:bg-rose-100",
    hoverBorder: "hover:border-rose-400",
  },
  competition: {
    badge: "bg-orange-100 text-orange-900",
    iconWrap: "bg-orange-100 text-orange-800",
    band: "bg-orange-50/60",
    rule: "bg-orange-500",
    seeMore: "border-orange-300 text-orange-900 hover:bg-orange-100",
    hoverBorder: "hover:border-orange-400",
  },
  conference: {
    badge: "bg-indigo-100 text-indigo-800",
    iconWrap: "bg-indigo-100 text-indigo-700",
    band: "bg-indigo-50/60",
    rule: "bg-indigo-600",
    seeMore: "border-indigo-200 text-indigo-800 hover:bg-indigo-100",
    hoverBorder: "hover:border-indigo-400",
  },
  exchange: {
    badge: "bg-teal-100 text-teal-800",
    iconWrap: "bg-teal-100 text-teal-700",
    band: "bg-teal-50/60",
    rule: "bg-teal-600",
    seeMore: "border-teal-200 text-teal-800 hover:bg-teal-100",
    hoverBorder: "hover:border-teal-400",
  },
  training: {
    badge: "bg-cyan-100 text-cyan-900",
    iconWrap: "bg-cyan-100 text-cyan-800",
    band: "bg-cyan-50/60",
    rule: "bg-cyan-600",
    seeMore: "border-cyan-300 text-cyan-900 hover:bg-cyan-100",
    hoverBorder: "hover:border-cyan-400",
  },
  workshop: {
    badge: "bg-lime-100 text-lime-900",
    iconWrap: "bg-lime-100 text-lime-800",
    band: "bg-lime-50/60",
    rule: "bg-lime-600",
    seeMore: "border-lime-300 text-lime-900 hover:bg-lime-100",
    hoverBorder: "hover:border-lime-400",
  },
  volunteering: {
    badge: "bg-pink-100 text-pink-800",
    iconWrap: "bg-pink-100 text-pink-700",
    band: "bg-pink-50/60",
    rule: "bg-pink-600",
    seeMore: "border-pink-200 text-pink-800 hover:bg-pink-100",
    hoverBorder: "hover:border-pink-400",
  },
};

const fallback: TypeTheme = {
  badge: "bg-slate-100 text-slate-800",
  iconWrap: "bg-slate-100 text-slate-700",
  band: "bg-slate-50",
  rule: "bg-slate-500",
  seeMore: "border-slate-300 text-slate-800 hover:bg-slate-100",
  hoverBorder: "hover:border-slate-400",
};

export function typeTheme(type: string): TypeTheme {
  return themes[type] ?? fallback;
}

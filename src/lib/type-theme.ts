// One color per opportunity type, used for tags, icons, section headers and
// hover states so each category reads as its own area of the site. Classes
// are written out in full (not built from strings) so Tailwind can see them.
// Text shades are 700-800 on 50-100 tints to stay above 4.5:1 contrast; the
// dark: pairs darken the fill and lighten the text for the same reason on a
// dark background.
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
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
    iconWrap: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
    band: "bg-emerald-50/60 dark:bg-emerald-950/20",
    rule: "bg-emerald-600 dark:bg-emerald-500",
    seeMore:
      "border-emerald-200 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950/50",
    hoverBorder: "hover:border-emerald-400 dark:hover:border-emerald-600",
  },
  job: {
    badge: "bg-sky-100 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300",
    iconWrap: "bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300",
    band: "bg-sky-50/60 dark:bg-sky-950/20",
    rule: "bg-sky-600 dark:bg-sky-500",
    seeMore:
      "border-sky-200 text-sky-800 hover:bg-sky-100 dark:border-sky-800 dark:text-sky-300 dark:hover:bg-sky-950/50",
    hoverBorder: "hover:border-sky-400 dark:hover:border-sky-600",
  },
  grant: {
    badge: "bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-300",
    iconWrap: "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
    band: "bg-amber-50/60 dark:bg-amber-950/20",
    rule: "bg-amber-500 dark:bg-amber-500",
    seeMore:
      "border-amber-300 text-amber-900 hover:bg-amber-100 dark:border-amber-800 dark:text-amber-300 dark:hover:bg-amber-950/50",
    hoverBorder: "hover:border-amber-400 dark:hover:border-amber-600",
  },
  fellowship: {
    badge: "bg-violet-100 text-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
    iconWrap: "bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
    band: "bg-violet-50/60 dark:bg-violet-950/20",
    rule: "bg-violet-600 dark:bg-violet-500",
    seeMore:
      "border-violet-200 text-violet-800 hover:bg-violet-100 dark:border-violet-800 dark:text-violet-300 dark:hover:bg-violet-950/50",
    hoverBorder: "hover:border-violet-400 dark:hover:border-violet-600",
  },
  internship: {
    badge: "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300",
    iconWrap: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300",
    band: "bg-rose-50/60 dark:bg-rose-950/20",
    rule: "bg-rose-600 dark:bg-rose-500",
    seeMore:
      "border-rose-200 text-rose-800 hover:bg-rose-100 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-950/50",
    hoverBorder: "hover:border-rose-400 dark:hover:border-rose-600",
  },
  competition: {
    badge: "bg-orange-100 text-orange-900 dark:bg-orange-950/50 dark:text-orange-300",
    iconWrap: "bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-300",
    band: "bg-orange-50/60 dark:bg-orange-950/20",
    rule: "bg-orange-500 dark:bg-orange-500",
    seeMore:
      "border-orange-300 text-orange-900 hover:bg-orange-100 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/50",
    hoverBorder: "hover:border-orange-400 dark:hover:border-orange-600",
  },
  conference: {
    badge: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300",
    iconWrap: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300",
    band: "bg-indigo-50/60 dark:bg-indigo-950/20",
    rule: "bg-indigo-600 dark:bg-indigo-500",
    seeMore:
      "border-indigo-200 text-indigo-800 hover:bg-indigo-100 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-950/50",
    hoverBorder: "hover:border-indigo-400 dark:hover:border-indigo-600",
  },
  course: {
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300",
    iconWrap: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
    band: "bg-blue-50/60 dark:bg-blue-950/20",
    rule: "bg-blue-600 dark:bg-blue-500",
    seeMore:
      "border-blue-200 text-blue-800 hover:bg-blue-100 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950/50",
    hoverBorder: "hover:border-blue-400 dark:hover:border-blue-600",
  },
  exchange: {
    badge: "bg-teal-100 text-teal-800 dark:bg-teal-950/50 dark:text-teal-300",
    iconWrap: "bg-teal-100 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300",
    band: "bg-teal-50/60 dark:bg-teal-950/20",
    rule: "bg-teal-600 dark:bg-teal-500",
    seeMore:
      "border-teal-200 text-teal-800 hover:bg-teal-100 dark:border-teal-800 dark:text-teal-300 dark:hover:bg-teal-950/50",
    hoverBorder: "hover:border-teal-400 dark:hover:border-teal-600",
  },
  training: {
    badge: "bg-cyan-100 text-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-300",
    iconWrap: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300",
    band: "bg-cyan-50/60 dark:bg-cyan-950/20",
    rule: "bg-cyan-600 dark:bg-cyan-500",
    seeMore:
      "border-cyan-300 text-cyan-900 hover:bg-cyan-100 dark:border-cyan-800 dark:text-cyan-300 dark:hover:bg-cyan-950/50",
    hoverBorder: "hover:border-cyan-400 dark:hover:border-cyan-600",
  },
  workshop: {
    badge: "bg-lime-100 text-lime-900 dark:bg-lime-950/50 dark:text-lime-300",
    iconWrap: "bg-lime-100 text-lime-800 dark:bg-lime-950/50 dark:text-lime-300",
    band: "bg-lime-50/60 dark:bg-lime-950/20",
    rule: "bg-lime-600 dark:bg-lime-500",
    seeMore:
      "border-lime-300 text-lime-900 hover:bg-lime-100 dark:border-lime-800 dark:text-lime-300 dark:hover:bg-lime-950/50",
    hoverBorder: "hover:border-lime-400 dark:hover:border-lime-600",
  },
  volunteering: {
    badge: "bg-pink-100 text-pink-800 dark:bg-pink-950/50 dark:text-pink-300",
    iconWrap: "bg-pink-100 text-pink-700 dark:bg-pink-950/50 dark:text-pink-300",
    band: "bg-pink-50/60 dark:bg-pink-950/20",
    rule: "bg-pink-600 dark:bg-pink-500",
    seeMore:
      "border-pink-200 text-pink-800 hover:bg-pink-100 dark:border-pink-800 dark:text-pink-300 dark:hover:bg-pink-950/50",
    hoverBorder: "hover:border-pink-400 dark:hover:border-pink-600",
  },
};

const fallback: TypeTheme = {
  badge: "bg-slate-100 text-slate-800 dark:bg-slate-800/60 dark:text-slate-300",
  iconWrap: "bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300",
  band: "bg-slate-50 dark:bg-slate-900/40",
  rule: "bg-slate-500",
  seeMore:
    "border-slate-300 text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800/60",
  hoverBorder: "hover:border-slate-400 dark:hover:border-slate-600",
};

export function typeTheme(type: string): TypeTheme {
  return themes[type] ?? fallback;
}

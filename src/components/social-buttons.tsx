import { FacebookLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { SOCIAL_LINKS } from "@/lib/social";

// Brand colors, with shades chosen so white text keeps at least 4.5:1 contrast.
const styles = {
  Facebook: { Icon: FacebookLogo, bg: "bg-[#1565d8]" },
  Instagram: {
    Icon: InstagramLogo,
    bg: "bg-gradient-to-r from-[#833ab4] to-[#c13584]",
  },
  LinkedIn: { Icon: LinkedinLogo, bg: "bg-[#0a66c2]" },
} as const;

export function SocialButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {SOCIAL_LINKS.map(({ label, href }) => {
        const { Icon, bg } = styles[label];
        return (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow us on ${label} (opens in a new tab)`}
            className={`inline-flex min-w-40 cursor-pointer items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md ${bg}`}
          >
            <Icon size={26} weight="fill" aria-hidden="true" />
            {label}
          </a>
        );
      })}
    </div>
  );
}

export function SocialBand() {
  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-8 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left lg:px-8">
        <div>
          <p className="font-display text-xl font-bold text-card-foreground">
            Follow us on social media
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            New opportunities, deadlines and tips, posted every day.
          </p>
        </div>
        <SocialButtons className="justify-center" />
      </div>
    </div>
  );
}

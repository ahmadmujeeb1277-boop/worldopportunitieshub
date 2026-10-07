import {
  Briefcase,
  ChalkboardTeacher,
  Compass,
  GraduationCap,
  Globe,
  HandCoins,
  Heart,
  Medal,
  Newspaper,
  Rocket,
  Trophy,
  UsersThree,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";

type IconComponent = React.ComponentType<{
  size?: number;
  weight?: "duotone";
  className?: string;
}>;

const kindIcons: Record<string, IconComponent> = {
  scholarship: GraduationCap,
  job: Briefcase,
  grant: HandCoins,
  fellowship: Medal,
  internship: Rocket,
  competition: Trophy,
  conference: UsersThree,
  exchange: Globe,
  training: ChalkboardTeacher,
  workshop: Wrench,
  volunteering: Heart,
  article: Newspaper,
};

// Fills its parent, so the parent sets the aspect ratio and clipping.
export function CardImage({
  src,
  alt,
  kind,
  iconSize = 48,
  className = "",
}: {
  src?: string | null;
  alt: string;
  kind: string;
  iconSize?: number;
  className?: string;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- admin can paste any host, which next/image would reject
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  const Icon = kindIcons[kind] ?? Compass;
  return (
    <div
      aria-hidden="true"
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 via-muted to-accent/20 ${className}`}
    >
      <Icon size={iconSize} weight="duotone" className="text-primary/60" />
    </div>
  );
}

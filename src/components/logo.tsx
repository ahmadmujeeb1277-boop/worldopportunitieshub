import Image from "next/image";
import Link from "next/link";

export function Logo({
  size = "md",
  showTagline = false,
}: {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}) {
  const dims = { sm: 28, md: 36, lg: 48 }[size];
  const textSize = { sm: "text-lg", md: "text-xl", lg: "text-2xl" }[size];

  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group">
      <Image
        src="/brand/logo-icon.svg"
        alt=""
        width={dims}
        height={dims}
        priority
        className="shrink-0"
      />
      <span className="flex flex-col leading-none">
        <span className={`font-bold tracking-tight ${textSize}`}>
          <span className="text-card-foreground">World</span>
          <span className="text-primary">Opportunities</span>
          <span className="text-[#0369A1] dark:text-sky-400">Hub</span>
        </span>
        {showTagline && (
          <span className="mt-1 text-xs font-medium text-muted-foreground tracking-wide">
            Scholarships &middot; Jobs &middot; Grants &middot; Fellowships
          </span>
        )}
      </span>
    </Link>
  );
}

import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

const CHANNEL_URL = "https://whatsapp.com/channel/0029VbDkvlgI1rcd1ClkKr0W";

export function WhatsAppBanner() {
  return (
    <div className="border-b border-border bg-[#25D366]/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 text-center sm:px-6 md:flex-row md:justify-between md:text-left lg:px-8">
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-[#0a0a0a]">
            <WhatsappLogo size={28} weight="fill" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-lg font-bold text-card-foreground">
              Get instant opportunity alerts
            </p>
            <p className="text-sm text-muted-foreground">
              Join our WhatsApp Channel for new scholarships, jobs, and fellowships.
            </p>
          </div>
        </div>
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-[#0a0a0a] transition-opacity hover:opacity-90"
        >
          <WhatsappLogo size={20} weight="fill" aria-hidden="true" />
          Follow us on WhatsApp
        </a>
      </div>
    </div>
  );
}

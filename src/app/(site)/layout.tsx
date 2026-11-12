import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GoogleAnalytics } from "@/components/google-analytics";
import { opportunityCountsByType } from "@/lib/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const counts = await opportunityCountsByType();

  return (
    <>
      <Navbar counts={counts} />
      <main className="flex-1">{children}</main>
      <Footer counts={counts} />
      <GoogleAnalytics />
    </>
  );
}

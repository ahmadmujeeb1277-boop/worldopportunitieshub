import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { OpportunityForm } from "../../opportunity-form";
import { updateOpportunity } from "@/app/actions/opportunities";

export const metadata = { title: "Edit Opportunity" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditOpportunityPage({ params }: PageProps) {
  const { id } = await params;
  const opportunity = await prisma.opportunity.findUnique({ where: { id } });

  if (!opportunity) notFound();

  const action = updateOpportunity.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-card-foreground">Edit Opportunity</h1>
      <p className="mt-1 truncate text-sm text-muted-foreground">{opportunity.title}</p>
      <div className="mt-6">
        <OpportunityForm action={action} opportunity={opportunity} />
      </div>
    </div>
  );
}

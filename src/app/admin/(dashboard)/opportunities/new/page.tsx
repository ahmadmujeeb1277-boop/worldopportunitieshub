import { OpportunityForm } from "../opportunity-form";
import { createOpportunity } from "@/app/actions/opportunities";

export const metadata = { title: "Add Opportunity" };

export default function NewOpportunityPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-card-foreground">Add Opportunity</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Fields marked * are required. Save as Draft to preview before publishing.
      </p>
      <div className="mt-6">
        <OpportunityForm action={createOpportunity} />
      </div>
    </div>
  );
}

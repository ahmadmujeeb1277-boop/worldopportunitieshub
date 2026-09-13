import { differenceInCalendarDays, format, isPast } from "date-fns";

export function formatDeadline(deadline: Date | string | null): string {
  if (!deadline) return "Rolling / No fixed deadline";
  const date = new Date(deadline);
  const daysLeft = differenceInCalendarDays(date, new Date());

  if (isPast(date)) return `Closed — ${format(date, "MMM d, yyyy")}`;
  if (daysLeft === 0) return "Closes today";
  if (daysLeft <= 14) return `Closing soon — ${daysLeft}d left`;
  return format(date, "MMM d, yyyy");
}

export function formatDate(date: Date | string | null): string {
  if (!date) return "";
  return format(new Date(date), "MMM d, yyyy");
}

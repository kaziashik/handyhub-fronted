import { PageTitle } from "@/components/modules/page-title";

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ scheduleId?: string }>;
}) {
  const { scheduleId } = await searchParams;

  return (
    <PageTitle
      title="Book this visit"
      detail={
        scheduleId
          ? "Confirm this schedule to continue to payment."
          : "Open a schedule from the home page to book it."
      }
    />
  );
}

import { PageTitle } from "@/components/modules/page-title";

export default function AboutPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8">
      <PageTitle
        title="About us"
        detail="HandyHub connects customers with verified technicians."
      />
      <div className="flex max-w-2xl flex-col gap-4 text-sm leading-6">
        <p>
          Customers browse the schedules published for today, see the
          technician, time, fee, and open slots, then book a visit.
        </p>
        <p>
          Technicians apply with their license and experience. After the email
          is verified and an admin approves the application, they sign in and
          publish the times they can work.
        </p>
        <p>
          Admins review those applications and keep the published schedules and
          bookings in order.
        </p>
      </div>
    </section>
  );
}

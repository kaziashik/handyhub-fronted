export default function TermsPage() {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-8 text-sm leading-6">
      <h1 className="text-2xl font-semibold">Terms</h1>
      <p>
        Customers can book a schedule only after a technician publishes it, the
        start time is still later today, and at least one slot is open.
      </p>
      <p>
        The consultation fee is collected through bKash. A visit stays pending
        until payment succeeds. You can cancel before the visit is marked
        ongoing or completed.
      </p>
      <p>
        Technician accounts are created only after the application email is
        verified and an admin approves it. A rejected application includes the
        reason the admin entered.
      </p>
    </article>
  );
}

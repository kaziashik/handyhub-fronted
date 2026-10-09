export default function PrivacyPage() {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-8 text-sm leading-6">
      <h1 className="text-2xl font-semibold">Privacy</h1>
      <p>
        HandyHub stores the name, email, phone, and role you submit when you
        register or apply as a technician. Passwords are hashed before they are
        saved. Session tokens stay in httpOnly cookies.
      </p>
      <p>
        A technician application also stores the license number, qualifications,
        experience, resume, and any extra files you upload. Admins can review
        that application. The public technician page shows the approved name,
        specialty, biography, fee, and photo.
      </p>
      <p>
        Appointment payment is handled by bKash. HandyHub keeps the payment
        status needed to confirm or refund the visit. Contact messages are
        emailed to the HandyHub inbox and include the address you type so we
        can reply.
      </p>
    </article>
  );
}

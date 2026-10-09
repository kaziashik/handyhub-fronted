export type Guide = {
  slug: string;
  title: string;
  summary: string;
  paragraphs: string[];
};

export const guides: Guide[] = [
  {
    slug: "book-a-visit",
    title: "How to book a visit",
    summary: "Find a published schedule for today and reserve an open slot.",
    paragraphs: [
      "Open Technicians or the home page to see schedules that are published for today and still have an open slot.",
      "Each listing shows the technician, the start and end time, the consultation fee, and how many slots remain.",
      "Guests are sent to login before booking. A signed-in customer continues to the booking page for that schedule.",
      "The visit stays pending until bKash confirms the payment. You can pay again or cancel before the visit is ongoing or completed.",
    ],
  },
  {
    slug: "pay-with-bkash",
    title: "Pay with bKash",
    summary: "HandyHub uses the bKash sandbox checkout for appointment payment.",
    paragraphs: [
      "Booking a schedule starts a bKash payment and opens the checkout for the consultation fee.",
      "If you leave checkout before paying, the appointment stays pending. Open My appointments and pay it again.",
      "After a successful payment, the return page reads the status from the address and the appointment is confirmed.",
      "A cancelled or failed checkout does not mark the visit as paid. You can start checkout again while it is still pending.",
    ],
  },
  {
    slug: "become-a-technician",
    title: "Become a technician",
    summary: "Apply with your license, verify the email, then wait for approval.",
    paragraphs: [
      "The apply form asks for your name, email, phone, specialization, license number, qualifications, experience, and a resume.",
      "HandyHub emails a one-time code. Verify that code before an admin can review the application.",
      "An admin can approve or reject only a pending application whose email is already verified. A rejection includes a reason.",
      "After approval, use Forgot password to set a password, then sign in. You can publish one schedule per day, and customers can book it only after it is published.",
    ],
  },
];

export function guideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

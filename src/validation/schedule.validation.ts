import z from "zod";

const twentyMinutes = 20 * 60 * 1000;

export const createScheduleSchema = z
  .object({
    startDateTime: z.string().min(1, "Start is required"),
    endDateTime: z.string().min(1, "End is required"),
    meetingLink: z.url("Invalid Meeting Link"),
  })
  .superRefine((value, ctx) => {
    if (!value.startDateTime || !value.endDateTime) return;

    const start = new Date(value.startDateTime);
    const end = new Date(value.endDateTime);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return;

    const sameDay =
      start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth() &&
      start.getDate() === end.getDate();
    if (!sameDay) {
      ctx.addIssue({
        code: "custom",
        path: ["endDateTime"],
        message: "Start and end must be on the same day",
      });
    }

    if (end.getTime() <= start.getTime()) {
      ctx.addIssue({
        code: "custom",
        path: ["endDateTime"],
        message: "End must be after the start",
      });
      return;
    }

    if (end.getTime() - start.getTime() < twentyMinutes) {
      ctx.addIssue({
        code: "custom",
        path: ["endDateTime"],
        message: "Schedule must be at least 20 minutes",
      });
    }
  });

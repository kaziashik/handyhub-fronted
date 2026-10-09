"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const questions = [
  {
    question: "Who can publish a schedule?",
    answer:
      "Only an approved technician. Customers can book that schedule after it is published.",
  },
  {
    question: "When can a visit be cancelled?",
    answer:
      "A customer or an admin can cancel before the visit is ongoing or completed.",
  },
  {
    question: "What does a technician application need?",
    answer:
      "A license number, experience, a resume, and a verified email before an admin reviews it.",
  },
  {
    question: "What if checkout is left before payment?",
    answer:
      "The appointment stays pending. Open your appointments and pay it again. A cancelled or failed checkout does not mark the visit as paid.",
  },
  {
    question: "How does a technician sign in after approval?",
    answer:
      "Use Forgot password to set a password, then sign in. You can publish one schedule per day.",
  },
];

export function HelpQuestions() {
  const [openQuestion, setOpenQuestion] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {questions.map((item, index) => {
        const open = openQuestion === index;
        return (
          <div key={item.question} className="overflow-hidden rounded-xl border bg-background">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium"
              aria-expanded={open}
              onClick={() => setOpenQuestion(open ? -1 : index)}
            >
              {item.question}
              <ChevronDown
                className={`size-4 shrink-0 text-primary transition duration-300 ${open ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {open ? (
              <p className="animate-rise px-4 pb-4 text-sm leading-6 text-muted-foreground">
                {item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

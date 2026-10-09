import ApplyTechnicianForm from "@/components/form/apply-technician-form";

export default function ApplyPage() {
  return (
    <div className="flex-1 bg-muted/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-6 md:px-8 md:py-10">
        <ApplyTechnicianForm />
      </div>
    </div>
  );
}

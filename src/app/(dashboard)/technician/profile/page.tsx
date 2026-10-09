import { ProfilePhoto } from "@/components/modules/profile/profile-photo";
import { PageTitle } from "@/components/modules/page-title";

export default function TechnicianProfilePage() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle title="Profile" detail="Your account and profile photo." />
      <ProfilePhoto />
    </div>
  );
}

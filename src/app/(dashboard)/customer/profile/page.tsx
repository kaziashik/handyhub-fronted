import { ProfileForm } from "@/components/modules/profile/profile-form";
import { ProfilePhoto } from "@/components/modules/profile/profile-photo";
import { PageTitle } from "@/components/modules/page-title";

export default function CustomerProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <PageTitle title="Profile" detail="Your account and profile photo." />
      <ProfilePhoto />
      <ProfileForm />
    </div>
  );
}

import { ProfileForm } from "@/components/modules/profile/profile-form";
import { ProfilePhoto } from "@/components/modules/profile/profile-photo";
import { PageTitle } from "@/components/modules/page-title";
import Link from "next/link";

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageTitle title="Settings" detail="Update the admin profile or change the password." />
      <ProfilePhoto />
      <ProfileForm />
      <Link href="/change-password" className="text-sm text-primary">
        Change password
      </Link>
    </div>
  );
}

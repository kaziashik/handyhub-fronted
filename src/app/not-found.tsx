import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-start justify-center gap-4 px-4 py-16">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-sm leading-6 text-muted-foreground">
        That address is not part of HandyHub. Check the link, or go back to the home page.
      </p>
      <Button render={<Link href="/">Back to home</Link>} nativeButton={false} />
    </div>
  );
}

"use client";

import { uploadProfileImage } from "@/api/user.api";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { meQueryKey, useMe } from "@/hooks/use-me";
import { toast, toastError } from "@/lib/toast";
import { useQueryClient } from "@tanstack/react-query";
import { FetchError } from "ofetch";
import { useState, type FormEvent } from "react";

function uploadErrorMessage(error: unknown) {
  if (error instanceof FetchError) {
    const body = error.data as { message?: string } | undefined;
    return body?.message ?? "Could not upload the photo";
  }
  return "Could not upload the photo";
}

export function ProfilePhoto() {
  const queryClient = useQueryClient();
  const { data } = useMe();
  const imageUrl = data?.data?.imageUrl;
  const [file, setFile] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState(0);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setErrorMessage(null);
    if (!file) {
      setErrorMessage("Choose a photo first.");
      return;
    }

    setPending(true);
    try {
      const result = await uploadProfileImage(file);
      const nextUrl = result.data?.imageUrl;
      if (nextUrl && data?.data) {
        queryClient.setQueryData(meQueryKey, {
          ...data,
          data: { ...data.data, imageUrl: nextUrl },
        });
      }
      await queryClient.invalidateQueries({ queryKey: meQueryKey });
      setFile(null);
      setInputKey((current) => current + 1);
      setMessage(null);
      toast.success("Profile photo updated");
    } catch (error) {
      setErrorMessage(toastError(uploadErrorMessage(error)));
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="flex max-w-sm flex-col gap-4" onSubmit={handleSubmit}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Profile photo"
          className="size-24 rounded-lg object-cover"
        />
      ) : (
        <p className="text-sm text-muted-foreground">No profile photo yet.</p>
      )}
      <Field>
        <FieldLabel htmlFor="profileImage">Profile photo</FieldLabel>
        <Input
          key={inputKey}
          id="profileImage"
          name="profileImage"
          type="file"
          accept="image/*"
          disabled={pending}
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        />
      </Field>
      {errorMessage ? (
        <p className="text-sm text-destructive">{errorMessage}</p>
      ) : null}
      {message ? <p className="text-sm">{message}</p> : null}
      <Button type="submit" className="w-fit" disabled={pending}>
        {pending ? "Uploading..." : "Upload photo"}
      </Button>
    </form>
  );
}

import { toast as sonner } from "sonner";

export const toast = {
  success(message: string) {
    sonner.success(message);
  },
  error(message: string) {
    sonner.error(message);
  },
};

export function toastError(message: string) {
  toast.error(message);
  return message;
}

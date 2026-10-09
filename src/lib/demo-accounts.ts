export type DemoAccount = {
  id: string;
  title: string;
  detail: string;
  email: string;
  password: string;
};

export const demoAccounts: DemoAccount[] = [
  {
    id: "user",
    title: "User",
    detail: "Book and manage visits",
    email: "user@gmail.com",
    password: "User@demo12345",
  },
  {
    id: "technician",
    title: "Technician",
    detail: "Publish times and complete visits",
    email: "testertechinian@gmail.com",
    password: "Tester@techinian12345",
  },
  {
    id: "admin",
    title: "Admin",
    detail: "Review technicians and bookings",
    email: "testeradmin@gmail.com",
    password: "Tester@admin12345",
  },
  {
    id: "super-admin",
    title: "Super admin",
    detail: "Full admin access",
    email: "superadmin@gmail.com",
    password: "Super@admin12345",
  },
];

const storageKey = "handyhub-demo-login";

export function rememberDemoAccount(id: string) {
  sessionStorage.setItem(storageKey, id);
}

export function takeDemoAccount() {
  const id = sessionStorage.getItem(storageKey);
  sessionStorage.removeItem(storageKey);
  return demoAccounts.find((account) => account.id === id) ?? null;
}

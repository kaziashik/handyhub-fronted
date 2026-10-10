export type ToastKind = "success" | "error";

export type ToastItem = {
  id: number;
  kind: ToastKind;
  message: string;
};

type ToastStore = {
  items: ToastItem[];
  nextId: number;
  listeners: Set<() => void>;
};

const storeKey = "__handyhubToasts";

function store(): ToastStore {
  const root = globalThis as typeof globalThis & { [storeKey]?: ToastStore };
  if (!root[storeKey]) {
    root[storeKey] = { items: [], nextId: 1, listeners: new Set() };
  }
  return root[storeKey];
}

function emit() {
  for (const listener of store().listeners) listener();
}

function push(kind: ToastKind, message: string) {
  const current = store();
  const id = current.nextId;
  current.nextId += 1;
  current.items = [...current.items, { id, kind, message }];
  emit();
  window.setTimeout(() => dismissToast(id), 5000);
}

export function dismissToast(id: number) {
  const current = store();
  current.items = current.items.filter((item) => item.id !== id);
  emit();
}

export function subscribeToasts(listener: () => void) {
  const current = store();
  current.listeners.add(listener);
  return () => current.listeners.delete(listener);
}

export function getToasts() {
  return store().items;
}

export const toast = {
  success(message: string) {
    push("success", message);
  },
  error(message: string) {
    push("error", message);
  },
};

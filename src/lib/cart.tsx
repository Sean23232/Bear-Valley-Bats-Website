import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type BatType = "Baseball" | "Softball" | "Slow Pitch";

/** One configured bat in the order request. No prices are stored: pricing is confirmed by the business. */
export type OrderItem = {
  id: string;
  woodId: string;
  woodName: string;
  isExotic: boolean;
  batType: BatType;
  handle: string;
  striped: boolean;
  knob: string;
  length: string;
  weight: string;
  label: string;
  heartwood: boolean;
  notes: string;
  addedAt: string;
};

type NewOrderItem = Omit<OrderItem, "id" | "addedAt">;

type CartContextValue = {
  items: OrderItem[];
  count: number;
  addItem: (item: NewOrderItem) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "bvb-order-requests-v1";

const CartContext = createContext<CartContextValue | null>(null);

function loadItems(): OrderItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as OrderItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>(loadItems);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable (private mode); the cart still works for this session */
    }
  }, [items]);

  const addItem = useCallback((item: NewOrderItem) => {
    const entry: OrderItem = {
      ...item,
      id: `${item.woodId}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      addedAt: new Date().toISOString(),
    };
    setItems((prev) => [...prev, entry]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({ items, count: items.length, addItem, removeItem, clear }),
    [items, addItem, removeItem, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

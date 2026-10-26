import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CheckCircle2 } from "lucide-react";

const CART_KEY = "mga_cart";

const CartContext = createContext(null);

const readCart = () => {
  try {
    const list = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
};

const TOAST_CSS = `
  .mga-toast {
    position: fixed;
    top: 84px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2147483000;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: calc(100vw - 32px);
    padding: 14px 22px;
    background: #ffffff;
    color: #16324f;
    font-size: 15px;
    font-weight: 600;
    border-radius: 12px;
    box-shadow: 0 12px 40px rgba(8, 15, 40, 0.25);
    animation: mga-toast-in 0.25s ease;
  }
  .mga-toast svg { color: #25b765; flex: 0 0 auto; }
  @keyframes mga-toast-in {
    from { opacity: 0; transform: translate(-50%, -10px); }
    to   { opacity: 1; transform: translate(-50%, 0); }
  }
`;

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);
  const [toast, setToast] = useState("");
  const timerRef = useRef(null);

  /* Persist */
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  /* Keep tabs in sync */
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === CART_KEY) setItems(readCart());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const showToast = useCallback((message) => {
    setToast(message);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToast(""), 2500);
  }, []);

  /* mode (optional): "online" | "hybrid" */
  const isInCart = useCallback(
    (slug, mode) =>
      items.some((i) => i.slug === slug && (!mode || i.mode === mode)),
    [items]
  );

  /* item = { slug, name, price, image, mode }
     Ek course ek hi baar: dubara add karne par mode/price update ho jata hai */
  const addItem = useCallback(
    (item) => {
      if (!item?.slug) return;
      setItems((prev) => [...prev.filter((i) => i.slug !== item.slug), item]);
      showToast(`Added ${item.name} to cart`);
    },
    [showToast]
  );

  const removeItem = useCallback((slug) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, count: items.length, addItem, removeItem, clearCart, isInCart }),
    [items, addItem, removeItem, clearCart, isInCart]
  );

  return (
    <CartContext.Provider value={value}>
      {children}

      {toast && (
        <>
          <style>{TOAST_CSS}</style>
          <div className="mga-toast" role="status" aria-live="polite">
            <CheckCircle2 size={22} />
            {toast}
          </div>
        </>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
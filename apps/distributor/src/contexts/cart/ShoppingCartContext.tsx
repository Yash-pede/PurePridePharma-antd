import { UseLocalStorage } from "@repo/ui";
import { ShoppingCart } from "../../components/cart/ShoppingCart";
import { createContext, useContext, ReactNode, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemsQuantity: (id: string) => number;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  clearCart: () => void;
};

type CartItem = {
  id: string;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({
  children: children,
}: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = UseLocalStorage<CartItem[]>("cart", []);
  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0,
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemsQuantity(id: string) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 5 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 5 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 5 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        getItemsQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        openCart,
        closeCart,
        clearCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}

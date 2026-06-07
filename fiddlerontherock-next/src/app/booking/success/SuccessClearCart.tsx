"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function SuccessClearCart() {
  const { clearCart } = useCart();
  
  useEffect(() => {
    clearCart();
    // Also clear localStorage directly just in case
    localStorage.removeItem("fotr_cart");
  }, [clearCart]);

  return null;
}

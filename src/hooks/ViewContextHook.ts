
import { useContext } from "react";
import { ViewContext } from "../context/ViewContext";

export function useViewContext() {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useViewContext must be used within a ViewProvider");
  }
  return context;
}
import { ReactNode } from "react";
import { toast as sonnerToast, ExternalToast } from "sonner";

type ToastType = "success" | "error" | "warning" | "info";

interface ShowToastParams {
  title: string;
  description?: string | ReactNode;
  type?: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
}

/**
 * Centralized toast system with modern design and enhanced functionality.
 * Supports actions, positioning, and improved styling.
 */
export function showToast({
  title,
  description,
  type = "info",
  duration = 4000,
  action,
  dismissible = true,
  position,
}: ShowToastParams) {
  // Modern color palette with better contrast and accessibility
  const modernStyles: Record<ToastType, React.CSSProperties> = {
    success: {
      backgroundColor: "#059669", // emerald-600 for better contrast
      color: "#ecfdf5", // green-50
      border: "1px solid #10b981", // emerald-500
    },
    error: {
      backgroundColor: "#dc2626", // red-600
      color: "#fef2f2", // red-50
      border: "1px solid #f87171", // red-400
    },
    warning: {
      backgroundColor: "#d97706", // amber-600
      color: "#fffbeb", // amber-50
      border: "1px solid #fbbf24", // amber-400
    },
    info: {
      backgroundColor: "#0284c7", // sky-600
      color: "#f0f9ff", // sky-50
      border: "1px solid #38bdf8", // sky-400
    },
  };

  const baseOptions: ExternalToast = {
    description,
    duration,
    dismissible,
    position,
    style: {
      ...modernStyles[type],
      borderRadius: "8px",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    ...(action && {
      action: {
        label: action.label,
        onClick: action.onClick,
      },
    }),
  };

  // Use a mapping approach to reduce repetition
  const toastMethods = {
    success: sonnerToast.success,
    error: sonnerToast.error,
    warning: sonnerToast.warning,
    info: sonnerToast.info,
  } as const;

  const toastMethod = toastMethods[type];
  return toastMethod(title, baseOptions);
}

// Convenience methods for common use cases
export const toast = {
  success: (
    title: string,
    description?: string | ReactNode,
    options?: Omit<ShowToastParams, "title" | "description" | "type">,
  ) => showToast({ title, description, type: "success", ...options }),

  error: (
    title: string,
    description?: string | ReactNode,
    options?: Omit<ShowToastParams, "title" | "description" | "type">,
  ) => showToast({ title, description, type: "error", ...options }),

  warning: (
    title: string,
    description?: string | ReactNode,
    options?: Omit<ShowToastParams, "title" | "description" | "type">,
  ) => showToast({ title, description, type: "warning", ...options }),

  info: (
    title: string,
    description?: string | ReactNode,
    options?: Omit<ShowToastParams, "title" | "description" | "type">,
  ) => showToast({ title, description, type: "info", ...options }),
};

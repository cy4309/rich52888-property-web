"use client";

import { useEffect, useId } from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
  HiOutlineXMark,
} from "react-icons/hi2";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type FeedbackModalVariant = "success" | "error" | "info";

type FeedbackModalProps = {
  open: boolean;
  onClose: () => void;
  variant: FeedbackModalVariant;
  title: string;
  message: string;
  confirmLabel?: string;
  closeOnBackdrop?: boolean;
  className?: string;
};

const VARIANT_STYLES: Record<
  FeedbackModalVariant,
  { iconWrap: string; Icon: typeof HiOutlineCheckCircle }
> = {
  success: {
    iconWrap: "bg-primary/10 text-primary",
    Icon: HiOutlineCheckCircle,
  },
  error: {
    iconWrap: "bg-red-50 text-red-600",
    Icon: HiOutlineExclamationCircle,
  },
  info: {
    iconWrap: "bg-neutral-100 text-neutral-600",
    Icon: HiOutlineInformationCircle,
  },
};

export default function FeedbackModal({
  open,
  onClose,
  variant,
  title,
  message,
  confirmLabel = "確定",
  closeOnBackdrop = true,
  className,
}: FeedbackModalProps) {
  const titleId = useId();
  const messageId = useId();
  const { iconWrap, Icon } = VARIANT_STYLES[variant];

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] flex items-center justify-center p-4",
        className,
      )}
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-deep/50 backdrop-blur-[2px]"
        aria-label="關閉提示"
        onClick={() => {
          if (closeOnBackdrop) onClose();
        }}
        tabIndex={closeOnBackdrop ? 0 : -1}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={messageId}
        className="relative w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-deep"
          aria-label="關閉"
        >
          <HiOutlineXMark className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div
            className={cn(
              "mb-4 flex h-14 w-14 items-center justify-center rounded-full",
              iconWrap,
            )}
          >
            <Icon className="h-8 w-8" aria-hidden />
          </div>
          <h3 id={titleId} className="text-lg font-bold text-deep">
            {title}
          </h3>
          <p
            id={messageId}
            className="mt-2 text-sm leading-relaxed text-neutral-600"
          >
            {message}
          </p>
          <Button
            type="button"
            onClick={onClose}
            className="mt-6 w-full px-6 py-3"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

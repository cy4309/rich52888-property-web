"use client";

import { useEffect } from "react";
import { FaRedo } from "react-icons/fa";
import BackLink from "@/components/ui/BackLink";
import ErrorPageShell, { errorActionBtn } from "@/components/ui/ErrorPageShell";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPageShell
      code="500"
      title="發生錯誤"
      description="頁面暫時無法載入，可能是連線或伺服器問題。請稍後再試，或返回首頁繼續瀏覽。"
    >
      <button type="button" onClick={reset} className={errorActionBtn}>
        <FaRedo className="h-3.5 w-3.5 shrink-0" aria-hidden />
        再試一次
      </button>
      <BackLink target="home" variant="action" />
    </ErrorPageShell>
  );
}

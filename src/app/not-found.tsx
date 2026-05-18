import BackLink from "@/components/ui/BackLink";
import ErrorPageShell from "@/components/ui/ErrorPageShell";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "找不到頁面",
  description: "您造訪的頁面不存在或已移除，請返回首頁或瀏覽最新消息。",
  index: false,
});

export default function NotFound() {
  return (
    <ErrorPageShell
      code="404"
      title="找不到頁面"
      description="您輸入的網址可能有誤，或此頁面已移動、下架。請返回首頁繼續瀏覽，或查看我們的最新消息。"
    >
      <BackLink target="home" variant="action" />
      <BackLink target="news" variant="action" />
    </ErrorPageShell>
  );
}

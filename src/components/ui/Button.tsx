import { cn } from "@/lib/utils";

const VARIANT_CLASS = {
  primary: "bg-primary text-white hover:bg-primary/90",
  outline: "border-2 border-primary text-primary hover:bg-primary/10",
} as const;

export type ButtonVariant = keyof typeof VARIANT_CLASS;

/** 與 Button 相同外觀，給 `Link` 等需導流時包在外層使用 */
export function buttonVariants(
  variant: ButtonVariant = "primary",
  className?: string,
) {
  return cn(
    "rounded-2xl px-6 py-3 font-medium transition-colors inline-flex items-center justify-center",
    VARIANT_CLASS[variant],
    className,
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariants(variant, className)} {...props}>
      {children}
    </button>
  );
}

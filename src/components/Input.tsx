import { cn } from "@/lib/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { InputHTMLAttributes, useId } from "react";

const inputVariants = cva(
  "w-full rounded-md border outline-none transition-all disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-zinc-400 focus-visible:ring-2",
  {
    variants: {
      Variant: {
        outline: "border-border bg-background focus-visible:ring-primary",
        filled:
          "border-transparent bg-zinc-100 focus-visible:ring-primary dark:bg-zinc-800",
        ghost: "border-transparent bg-transparent focus-visible:ring-primary",
      },
      Size: {
        sm: "h-8 px-2 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      Variant: "outline",
    },
  },
);

interface InputProps
  extends
    InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  className?: string;
  label?: string;
  id?: string;
  error?: string;
  helperText?: string;
}
const Input = ({
  Variant,
  Size,
  className,
  error,
  id,
  label,
  helperText,
  ...props
}: InputProps) => {
  const generateId = useId();
  const inputId = id || generateId;
  return (
    <div className="space-y-2">
      {label && (
        <label
          className="text-sm font-medium text-foreground"
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(inputVariants({ Variant, Size }), className)}
        {...props}
      />
      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;

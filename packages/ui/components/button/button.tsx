// packages/ui/components/button/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@horazion/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-[14px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hrz-focus-ring focus-visible:ring-offset-2 ring-offset-hrz-background disabled:pointer-events-none disabled:opacity-[0.38]",
  {
    variants: {
      variant: {
        default:
          "bg-hrz-brand-red text-white hover:opacity-90 active:scale-[0.98]",
        secondary:
          "bg-transparent border border-hrz-border text-hrz-text-primary hover:bg-hrz-surface active:scale-[0.98]",
        tertiary:
          "bg-transparent text-hrz-text-primary underline-offset-4 hover:underline",
        destructive:
          "bg-hrz-danger text-white hover:opacity-90 active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-[12px]",
        lg: "h-12 px-8 text-[16px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Permite que o botão aja como um wrapper polimórfico (ex: envolvendo um <Link>) */
  asChild?: boolean;
  /** Estado de carregamento que desabilita o botão e pode exibir um spinner */
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
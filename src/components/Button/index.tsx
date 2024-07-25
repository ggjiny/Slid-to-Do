import cn from '@utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, ReactNode } from 'react';

const ButtonVariants = cva(
  'flex justify-center items-center font-semibold text-sm',
  {
    variants: {
      shape: {
        solid:
          'text-white rounded-xl bg-blue-500 hover:bg-blue-600 active:bg-blue-800 disabled:bg-slate-400',
        outlined:
          'rounded-xl text-blue-500 border-[1px] border-blue-500 hover:text-blue-600 hover:border-blue-600' +
          'active:bg-blue-800 active:border-blue-800 disabled:text-slate-400 disabled:border-slate-400',
      },
      round: {
        xl: 'rounded-xl',
        '3xl': 'rounded-3xl',
      },
      size: {
        lg: 'w-[291px] h-12 text-base',
        sm: 'w-[150px] h-[44px]',
        xs: 'w-[84px] h-9',
      },
    },
    defaultVariants: {
      round: 'xl',
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  children?: ReactNode;
  additionalClass?: string;
}

function Button({
  shape,
  round,
  size,
  children,
  additionalClass,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(ButtonVariants({ shape, round, size }), additionalClass)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

import { cva } from 'class-variance-authority';

const InputVariants = cva(
  'h-12 w-full rounded-xl bg-slate-50 font-normal py-3 pl-6 pr-14 placeholder:text-slate-400 border-[1px] outline-none border-transparent ' +
    'hover:border-blue-300 focus:border-blue-500',
  {
    variants: {
      size: {
        lg: 'h-12 text-base',
        sm: 'h-[44px] text-sm',
      },
      isInvalid: {
        true: '!border-red-700',
        false: '',
      },
    },
    defaultVariants: {
      isInvalid: false,
    },
  },
);

export default InputVariants;

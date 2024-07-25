import InputVariants from '@styles/inputVariants';
import cn from '@utils/cn';
import { VariantProps } from 'class-variance-authority';
import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof InputVariants> {
  isInvalid?: boolean;
  additionalClass?: string;
}

// forwardRef<ref가 참조하는 요소 타입, 컴포넌트 props의 타입>
const BaseInput = forwardRef<HTMLInputElement, InputProps>(
  ({ size, isInvalid, additionalClass, ...props }, ref) => (
    <input
      ref={ref}
      type="text"
      className={cn(InputVariants({ size, isInvalid }), additionalClass)}
      {...props}
    />
  ),
);

BaseInput.displayName = 'BaseInput';

export default BaseInput;

import { VisibilityOffIcon, VisibilityOnIcon } from '@assets';
import InputVariants from '@styles/inputVariants';
import cn from '@utils/cn';
import { VariantProps } from 'class-variance-authority';
import { forwardRef, InputHTMLAttributes, useState } from 'react';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof InputVariants> {
  isInvalid?: boolean;
  additionalClass?: string;
}

// forwardRef<ref가 참조하는 요소 타입, 컴포넌트 props의 타입>
const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ size, isInvalid, additionalClass, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
      <div className={cn('relative', additionalClass)}>
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={cn(InputVariants({ size, isInvalid }))}
          {...props}
        />
        {showPassword ? (
          <VisibilityOnIcon
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-6 top-1/2 -translate-y-1/2 transform cursor-pointer"
          />
        ) : (
          <VisibilityOffIcon
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-6 top-1/2 -translate-y-1/2 transform cursor-pointer"
          />
        )}
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;

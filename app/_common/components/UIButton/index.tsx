import { Loader } from 'lucide-react';
import React from 'react';
import { cn } from 'src/utils/cn';

import { Button, type ButtonProps } from '@/components/ui/button';

interface ExtendedButtonProps extends ButtonProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconClassName?: string;
}

const UIButton = React.forwardRef<HTMLButtonElement, ExtendedButtonProps>(
  (
    {
      leftIcon,
      rightIcon,
      children,
      size,
      isLoading,
      fullWidth,
      className,
      icon = false,
      iconClassName,
      ...props
    },
    ref,
  ) => {
    const LeftIconWithClass = leftIcon
      ? React.cloneElement(leftIcon as React.ReactElement, {
          className: cn(
            size === 'sm' ? 'h-3 w-3' : size !== 'lg' ? 'h-4 w-4' : 'h-5 w-5',
            iconClassName,
          ),
        })
      : null;

    const RightIconWithClass = rightIcon
      ? React.cloneElement(rightIcon as React.ReactElement, {
          className: cn(
            size === 'sm' ? 'h-3 w-3' : size !== 'lg' ? 'h-4 w-4' : 'h-5 w-5',
            iconClassName,
          ),
        })
      : null;

    const IconWithClass = icon
      ? React.cloneElement(icon as React.ReactElement, {
          className: cn(
            size === 'sm' ? 'h-3 w-3' : size !== 'lg' ? 'h-5 w-5' : 'h-7 w-7',
            iconClassName,
          ),
        })
      : null;

    const inputClasses = icon
      ? size === 'sm'
        ? 'h-7 w-7 p-0'
        : size !== 'lg'
          ? 'h-9 w-9 p-0'
          : 'h-11 w-11 p-0'
      : cn(fullWidth && 'w-full', className);

    return (
      <Button
        {...props}
        ref={ref}
        size={size}
        style={{
          pointerEvents: isLoading ? 'none' : 'auto',
        }}
        className={inputClasses}
      >
        {icon ? (
          isLoading ? (
            <Loader className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            IconWithClass
          )
        ) : (
          <>
            {isLoading ? (
              <Loader className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <>
                {LeftIconWithClass && (
                  <span
                    className={
                      size === 'sm' ? 'mr-1' : size !== 'lg' ? 'mr-1' : 'mr-2'
                    }
                  >
                    {LeftIconWithClass}
                  </span>
                )}
                {RightIconWithClass && (
                  <span
                    className={
                      size === 'sm' ? 'ml-1' : size !== 'lg' ? 'ml-1' : 'ml-2'
                    }
                  >
                    {RightIconWithClass}
                  </span>
                )}
              </>
            )}
            {children}
          </>
        )}
      </Button>
    );
  },
);

UIButton.displayName = 'UIButton';

export { UIButton };

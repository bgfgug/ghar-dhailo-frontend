
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AccessibleButtonProps extends ButtonProps {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  loading?: boolean;
}

const AccessibleButton = React.forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ ariaLabel, ariaDescribedBy, loading, children, className, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(className)}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-busy={loading}
        {...props}
      >
        {loading && <span className="sr-only">Loading...</span>}
        {children}
      </Button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;
